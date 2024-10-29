import * as CryptoJS from "crypto-js";

export function EncryptBasic(text: string, secretKey: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
}

export function DecryptBasic(encryptedText: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
export function Encrypt(text: string, secretKey: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return base64UrlEncode(encrypted);
}

export function Decrypt(encryptedText: string, secretKey: string): string {
  const base64 = base64UrlDecode(encryptedText);
  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function base64UrlEncode(str: string): string {
  return CryptoJS.enc.Base64.parse(str)
    .toString(CryptoJS.enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) {
    base64 += "=".repeat(4 - pad);
  }
  return base64;
}
