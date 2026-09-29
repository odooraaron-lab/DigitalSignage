import { randomBytes } from 'crypto';

export const token = (bytes = 24) => randomBytes(bytes).toString('base64url');
