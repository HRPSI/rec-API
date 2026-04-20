import { SetMetadata } from '@nestjs/common';

export const SkipJWT = () => SetMetadata(true, true);
