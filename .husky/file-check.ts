import { execSync } from 'child_process';
const path = require('path');
const fs = require('fs');

// Max file size in bytes (2 MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Allowed extensions
const ALLOWED_EXTENSIONS = ['.ts', '.json', '.js', '.yml', '.md', '.mjs'];

// Folders to ignore entirely
const IGNORED_FOLDERS = ['.husky'];

// Secret files to reject
const SECRET_FILES = ['.env'];

// Get list of staged files that are NOT ignored
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
	.toString()
	.trim()
	.split('\n')
	.filter(Boolean);

// flags
let hasSizeError = false;
let hasExtensionError = false;
let hasEnvError = false;
console.log('stagedFiles:', stagedFiles);

stagedFiles.forEach((file: string) => {
	// Skip files in ignored folders
	if (IGNORED_FOLDERS.some((folder) => file.startsWith(folder + '/'))) {
		return;
	}

	// Skip secret files (.env)
	if (SECRET_FILES.some((secret) => file.includes(secret))) {
		console.error(`❌ ${file} is not allowed. Because it is a secret file.`);
		hasEnvError = true;
	}

	const ext = path.extname(file);

	// Detect files not in allowed extensions
	if (!ALLOWED_EXTENSIONS.includes(ext)) {
		console.error(`❌ ${file} has an invalid extension.`);
		hasExtensionError = true;
	}

	const filePath = path.resolve(file);

	// Skip if file doesn't exist (deleted files)
	if (!fs.existsSync(filePath)) return;

	const stats = fs.statSync(filePath);

	// Check file size
	if (stats.size > MAX_FILE_SIZE) {
		console.error(
			`❌ ${file} is too large (${(stats.size / (1024 * 1024)).toFixed(2)} MB). Max allowed is ${(
				MAX_FILE_SIZE /
				(1024 * 1024)
			).toFixed(2)} MB.`,
		);
		hasSizeError = true;
	}
});

if (hasExtensionError) {
	console.info(`✅ Allowed extensions are: ${ALLOWED_EXTENSIONS.join(', ')}`);
	console.info(`ℹ️ You can configure allowed extensions in the .husky/file-check.ts file.`);
	process.exit(1);
}

if (hasSizeError) {
	console.info(`ℹ️ You can configure max file size in the .husky/file-check.ts file.`);
	process.exit(1);
}

if (hasEnvError) {
	console.info(`ℹ️ You can configure secret files in the .husky/file-check.ts file.`);
	process.exit(1);
}

process.exit(0);
