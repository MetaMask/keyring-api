import { define } from 'superstruct';

/**
 * Validates if a given value is a valid URL.
 *
 * @param value - The value to be validated.
 * @returns A boolean indicating if the value is a valid URL.
 */
export const UrlStruct = define<string>('Url', (value: unknown) => {
  let url;

  try {
    url = new URL(value as string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
});
