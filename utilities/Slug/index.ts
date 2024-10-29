/**
 * The function ConvertSlug decodes and sanitizes a URL slug by replacing special characters with
 * hyphens and converting it to lowercase.
 * @param {string} encodedSlug - The `encodedSlug` parameter is a string that represents a URL slug
 * that has been encoded. The function `ConvertSlug` takes this encoded slug, decodes it, removes any
 * special characters, trims whitespace, replaces spaces with hyphens, and converts the slug to
 * lowercase before returning the processed
 * @returns The function `ConvertSlug` takes an encoded slug as input, decodes it twice, replaces any
 * non-alphanumeric characters with hyphens, trims leading and trailing spaces, replaces consecutive
 * spaces with a single hyphen, and converts the result to lowercase. The final processed slug is then
 * returned. If the input encoded slug is empty or falsy, an empty string is returned.
 */
export function ConvertSlug(encodedSlug: string): string {
  // double encode
  if (encodedSlug) {
    const firstDecode = decodeURIComponent(encodedSlug);
    const decodedSlug = decodeURIComponent(firstDecode);

    const slug = decodedSlug
      .replace(/[^a-zA-Z0-9\s\-đĐ]+/g, "-")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    return slug;
  }
  return "";
}
