"use client";

import Overlay from "@/components/Overlay";
import {RootState} from "@/stores";
import {usePathname} from "next/navigation";
import {ReactNode, FC} from "react";
import {Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";

/**
 * The MainLayout type in TypeScript React defines a component with children and theme props.
 * @property {ReactNode} children - The `children` property in the `MainLayout` type represents the
 * content that will be rendered inside the layout component. It is of type `ReactNode`, which is a
 * type that represents any valid React node, such as a JSX element, a string, a number, `null`, or an
 * @property {string} theme - The `theme` property in the `MainLayout` type represents the styling
 * theme that will be applied to the layout. It could be a string value that specifies the theme, such
 * as "light" or "dark", which can be used to style the components within the layout accordingly.
 */
type MainLayout = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayout> = ({children}) => {
  const {overlay_loading} = useSelector((state: RootState) => state.theme);

  return (
    <div>
      {children}
      <Toaster position="top-center" containerClassName="!z-[9999]" />
      <Overlay loading={overlay_loading} open={overlay_loading} />
    </div>
  );
};
