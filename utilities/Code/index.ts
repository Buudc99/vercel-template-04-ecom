import {v4 as uuidv4} from "uuid";
import {Variables} from "@/common";
import {EncryptBasic} from "../HashAES";

/**
 * The function `UUID1YCODE` generates a unique encrypted code based on a UUID and timestamp.
 * @returns A unique hash code generated by encrypting a combination of a UUID generated using the
 * `uuidv4()` function, a timestamp, and an AES secret key stored in the
 * `Variables.AES_SECRET_ID_USER_CODE`.
 */
export const UUID1YCODE = (): string => {
  const timestamp = Date.now();
  const code = `${uuidv4()}-${timestamp}`;
  const uniqueHashCode = EncryptBasic(code, Variables.AES_SECRET_ID_USER_CODE);
  return uniqueHashCode;
};
