/**
 * Capitalize the first letter of a string
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function CapitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * The function `CleanStringRoute` removes "/content/" from the input string and then removes all
 * hyphens from the resulting string.
 * @param {string} input - The `CleanStringRoute` function takes a string input and removes any
 * occurrences of "/content/" and all hyphens ("-") from the input string before returning the cleaned
 * string.
 * @returns The function CleanStringRoute is removing "/content/" from the input string and then
 * removing any dashes ("-") by splitting the string at each dash and joining the parts back together.
 * The cleaned string is then returned.
 */
export function CleanStringRoute(
  input: string,
  isCapitalizeFirstLetter?: boolean
): string {
  const withoutContent = input.replace("/products/", "");
  const cleanedString = withoutContent.split("-").join(" ");

  return isCapitalizeFirstLetter
    ? CapitalizeFirstLetter(cleanedString)
    : cleanedString;
}

/**
 * The function `FormatWithComma` takes a number as input and returns a string representation of the
 * number with commas added for every three digits.
 * @param {number} num - The `num` parameter in the `FormatWithComma` function is a number that you
 * want to format with commas for better readability.
 * @returns The function `FormatWithComma` takes a number as input, converts it to a string, and then
 * uses a regular expression to insert commas for every three digits in the number. The function
 * returns the formatted number as a string with commas inserted.
 */
export function FormatWithComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * The function FormatWithDot takes a number as input and returns a string representation of the number
 * with dots as thousand separators.
 * @param {number} num - The `FormatWithDot` function takes a number as input and formats it by adding
 * a dot as a thousands separator.
 * @returns The function `FormatWithDot` takes a number as input, converts it to a string, and then
 * uses a regular expression to insert a dot (".") as a thousands separator. The function returns the
 * formatted number with dots as separators.
 */
export function FormatWithDot(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * The `FormatCurrency` function in TypeScript formats a number as currency in Vietnamese dong with an
 * option to use commas for decimal points.
 * @param {number} num - The `num` parameter in the `FormatCurrency` function represents the number
 * that you want to format as a currency value.
 * @param [useComma=true] - The `useComma` parameter in the `FormatCurrency` function is a boolean
 * parameter that determines whether the formatted currency should use a comma as the decimal
 * separator. If `useComma` is set to `true`, the formatted currency will use a comma as the decimal
 * separator. If `use
 * @returns The `FormatCurrency` function returns a formatted currency string based on the input number
 * `num`. The currency format is in Vietnamese Dong (VND) with no decimal places. If the `useComma`
 * parameter is set to `true`, the function replaces the decimal point with a comma in the formatted
 * string before returning it.
 */
export function FormatCurrency(num: number, useComma = true) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(num).replace(".", useComma ? "," : ".");
}
