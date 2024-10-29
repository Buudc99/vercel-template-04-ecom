/**
 * Converts a timestamp to a formatted date string.
 *
 * @param timestamp - The timestamp to convert. It should be a number representing milliseconds since the Unix epoch.
 * @returns A string representing the date in the format "Month Day, Year".
 *
 * @example
 */

/**
 * The function `FormatTimestampToDate` takes a timestamp as input and returns a formatted date string
 * in the "MMM DD, YYYY" format.
 * @param {number} timestamp - The `timestamp` parameter is a number representing a specific point in
 * time, typically measured in milliseconds since the Unix epoch (January 1, 1970). This function takes
 * a timestamp as input and converts it into a formatted date string in the "en-US" locale with the
 * year, month (
 * @returns The function `FormatTimestampToDate` takes a timestamp as input, converts it to a Date
 * object, and then returns a formatted string representing the date in the format "MMM DD, YYYY"
 * (e.g., "Jan 01, 2022").
 */
export function FormatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
} //

/**
 * The TimeAgo function calculates the time interval between a given date and the current date in terms
 * of years, months, weeks, days, hours, minutes, and seconds, and returns a human-readable string
 * indicating how long ago that date was.
 * @param {string} dateString - The `TimeAgo` function you provided calculates the time elapsed between
 * a given date string and the current date, returning a human-readable string indicating how long ago
 * the date occurred.
 * @returns The function `TimeAgo` takes a date string as input, calculates the time difference between
 * that date and the current date, and returns a string indicating how long ago that date was. If the
 * time interval is greater than or equal to 1 year, month, week, day, hour, or minute, it will return
 * a string in the format of "X unit(s) ago" where
 */
export function TimeAgo(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

/**
 * The `SortByDateDesc` type in TypeScript specifies an array and a mode to sort by either creation
 * date or update date in descending order.
 * @property {any[]} arr - The `arr` property is an array that contains the elements to be sorted.
 * @property {"byCreated" | "byUpdated"} mode - The `mode` property in the `SortByDateDesc` type
 * specifies whether the array should be sorted by the date it was created or by the date it was last
 * updated. It can have one of two possible values: "byCreated" or "byUpdated".
 */
type SortByDateDesc = {
  arr: any[];
  mode: "byCreated" | "byUpdated";
};
/**
 * The function `SortByDateDesc` sorts an array of objects by date in descending order based on a
 * specified mode (either "byCreated" or "byUpdated").
 * @param {SortByDateDesc}  - The `SortByDateDesc` function takes an object with two properties: `arr`
 * and `mode`. The `arr` property is an array of items to be sorted, and the `mode` property specifies
 * whether to sort the items by their creation date ("byCreated") or their update date
 * @returns The `SortByDateDesc` function returns an array sorted in descending order by date based on
 * the specified mode ("byCreated" or "byUpdated"). If the input array `arr` is empty or `mode` is not
 * provided, an empty array is returned.
 */
export const SortByDateDesc = ({arr, mode}: SortByDateDesc): any[] => {
  if (arr?.length > 0) {
    return mode === "byCreated"
      ? arr.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      : mode === "byUpdated"
        ? arr.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
        : [];
  }
  return [];
};
