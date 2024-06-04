import { createHash } from 'crypto';

export const hashString = (input: string): string => {
  return createHash('sha256').
    update(input).
    digest('hex');
}