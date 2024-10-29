import Cookies from "js-cookie";

const COOKIE_NAME = "uci";

/**
 * The `SaveToken` function sets a cookie with the provided token value
 * and specific attributes for secure storage.
 * @param {string} token - The token parameter represents the authentication token to save in a cookie.
 */
export const SaveCookie = (token: string): void => {
  Cookies.set(COOKIE_NAME, token, {
    expires: 365,
    secure: true,
    sameSite: "Strict",
  });
};

/**
 * The `GetToken` function retrieves the value of the "uci" cookie.
 * @returns {string | undefined} - Returns the value of the cookie if found, or undefined if not found.
 */
export const GetCookie = (): string | undefined => {
  return Cookies.get(COOKIE_NAME);
};

/**
 * The `RemoveToken` function removes the "uci" cookie from the document.
 */
export const RemoveCookie = (): void => {
  Cookies.remove(COOKIE_NAME);
};

/**
 * The `UpdateToken` function updates the stored token by saving a new token value.
 * @param {string} newToken - A string representing the new token to be saved.
 */
export const UpdateCookie = (newToken: string): void => {
  SaveCookie(newToken);
};
