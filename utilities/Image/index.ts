import {Placeholder} from "@/assets/images";
import React, {FC} from "react";

/**
 * This function generates a URL for an avatar image based on the provided first and last names.
 * It uses the Iranian Liara Avatar service to create the image.
 *
 * @param firstName - The first name of the person whose avatar is to be generated.
 * @param lastName - The last name of the person whose avatar is to be generated.
 *
 * @returns A string representing the URL of the avatar image.
 * The URL is constructed by concatenating the first and last names with a '+' character,
 * and passing this as the 'username' query parameter to the Iranian Liara Avatar service.
 *
 * @example
 */
export const AvatarWithName = (firstName: string, lastName: string) => {
  return `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
};

type ImagePlaceholderProps = {
  wSize?: number;
  hSize?: number;
  bgColor?: string;
  contentColor?: string;
  content?: string;
  isGray?: boolean;
};
/**
 * This function generates a URL for a placeholder image based on the provided parameters.//+
 * It uses the Placeholder.co service to create the image.//+
 *
 * @param props - An object containing the properties for the placeholder image.//+
 * @param props.wSize - The width of the image in pixels. Default is 600.//+
 * @param props.hSize - The height of the image in pixels. Default is 400.//+
 * @param props.bgColor - The background color of the image in hexadecimal format.//+
 * @param props.contentColor - The color of the content text in hexadecimal format.//+
 * @param props.content - The text to be displayed on the image. Spaces will be replaced with '+'.//+
 *
 * @returns A string representing the URL of the placeholder image.//+
 * The URL is constructed by concatenating the width, height, background color, content color, and content//+
 * parameters to the Placeholder.co service URL.//+
 *
 * @example
 */
export const ImagePlaceholder = ({
  bgColor = "00000011",
  content = "No Image",
  contentColor = "000000cc",
  hSize = 400,
  wSize = 600,
  isGray = false,
}: ImagePlaceholderProps) => {
  return !isGray
    ? `${Placeholder.src}`
    : `https://placehold.co/${wSize}x${hSize}${bgColor && `/${bgColor || ""}`}${
        contentColor ? `/${contentColor}` : ""
      }${content ? `?text=${content.replace(/ /g, "+")}` : ""}`;
};
