import {Category} from "@/types";
import {ContentDaum} from "@/types/AllContent";

/**
 * This function searches for a specific value within a given array of objects based on a key-value pair.
 * If the value is found, it returns the corresponding value of another specified key.
 *
 * @param data - An array of objects where each object has string keys and any values.
 * @param findKey - The key to search for in each object.
 * @param valueOfFindKey - The specific value to match against the `findKey`.
 * @param returnKey - The key whose value should be returned if the `findKey` and `valueOfFindKey` are found.
 *
 * @returns The value of the `returnKey` if the `findKey` and `valueOfFindKey` are found in any object.
 *          If not found, it returns `empty string`.
 */
export const FindValueWithKey = (
  data: {[key: string]: any}[],
  findKey: string,
  valueOfFindKey: string,
  returnKey: string
): any => {
  if (data) {
    const found = data.find((item) => item[findKey] === valueOfFindKey);
    if (found) {
      const value = found[returnKey];
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }

  return "";
};

/**
 * The function `getImageValues` filters an array of `ContentDaum` objects to include only those with a
 * `field_layout` slug of "image" or "thumbnail", then maps these objects to extract their `value`
 * property as an array of strings.
 * @param {ContentDaum[]} arrayData - ContentDaum[] - an array of objects containing data from a
 * content source, specifically from Daum platform. Each object in the array has a field_layout
 * property with a slug and data property.
 * @returns An array of strings containing the values of the "value" property from items in the input
 * array `arrayData` that have a `field_layout` with a slug of "image" or "thumbnail".
 */
export const FindImageValues = (arrayData: ContentDaum[]): string[] => {
  if (arrayData?.length > 0) {
    return arrayData
      .filter((item) => item.slug === "Image" || item.slug === "Thumbnail")
      .map((item) => item.value);
  }
  return [];
};

/**
 * The function `FindValuesWithKey` takes an array of objects and a key, and returns the value
 * associated with that key in the object where the key matches the specified value.
 * @param {KeyProps}  - The function `FindValuesWithKey` takes in an object with two properties:
 * @returns The function `FindValuesWithKey` returns the value of `foundItem.field_layout.data.value`
 * if `foundItem` is truthy, otherwise it returns an empty string.
 */
type KeyProps = {
  arrayData: ContentDaum[] | any[];
  findKey:
    | "Title"
    | "Image"
    | "Thumnaii"
    | "Content"
    | "Body"
    | "Created_at"
    | "Price"
    | "categories";
};
export const FindValuesWithKey = ({arrayData, findKey}: KeyProps): string => {
  if (arrayData?.length > 0) {
    const foundItem = arrayData.find((item) => item.schema_name === findKey);

    return foundItem ? foundItem.value : "";
  }
  return "";
};

/**
 * The `FormatHTMLContent` function takes HTML content as input, removes HTML tags, and limits the
 * output to a specified length with an ellipsis if necessary.
 * @param {string} htmlContent - The `htmlContent` parameter is a string that represents the HTML
 * content that you want to format. This function will remove any HTML tags from this content and
 * return a plain text version of it.
 * @param {number} [limit=100] - The `limit` parameter in the `FormatHTMLContent` function specifies
 * the maximum number of characters that the function will return. If the plain text extracted from the
 * HTML content exceeds this limit, the function will truncate the text and append '...' at the end to
 * indicate that the text has been shortened.
 * @returns The `FormatHTMLContent` function returns a formatted version of the HTML content provided
 * as input. If the plain text extracted from the HTML content exceeds the specified limit, it will be
 * truncated to the limit and appended with '...'. Otherwise, the plain text will be returned as is.
 */
export const FormatHTMLContent = (
  htmlContent: string,
  limit: number = 100
): string => {
  if (htmlContent) {
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");

    return plainText.length > limit
      ? plainText.slice(0, limit) + "..."
      : plainText;
  }
  return "";
};

/**
 * The function `FilterDuplicateCategories` removes duplicate categories based on their slug property
 * from an array of Category objects.
 * @param {Category[]} categories - An array of Category objects. Each Category object has a property
 * called "slug" which is used to identify unique categories.
 * @returns The function `FilterDuplicateCategories` returns an array of unique `Category` objects with
 * no duplicate `slug` values.
 */
export const FilterDuplicateCategories = (
  categories: Category[]
): Category[] => {
  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.slug === category.slug)
  );
  return uniqueCategories;
};
