"use client";
import {store} from "@/stores";
import {FC, ReactNode} from "react";
import {Provider} from "react-redux";

type ClientProviderProps = {
  children: ReactNode;
};

export const ClientProvider: FC<ClientProviderProps> = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};
