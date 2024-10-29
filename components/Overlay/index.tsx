"use client";
import {CheckedTick, Loader} from "@/assets/icons";
import clsx from "clsx";
import dynamic from "next/dynamic";
import React, {FC} from "react";

const Lottie = dynamic(() => import("lottie-react"), {ssr: false});

type OverlayProps = {
  loading?: boolean;
  open?: boolean;
};

const Overlay: FC<OverlayProps> = ({open = false, loading = true}) => {
  return (
    <div
      className={clsx(
        "flex z-[1500] top-0 left-0 items-center justify-center w-screen fixed bg-black/50",
        "transition-all duration-500",
        open
          ? "animate-in fade-in-50 h-screen visible opacity-100"
          : "animate-out fade-out-0 h-0 invisible opacity-0"
      )}
    >
      <div className="w-52 h-52 bg-white shadow-lg rounded-3xl flex items-center justify-center">
        {loading ? (
          <Lottie animationData={Loader} loop autoPlay />
        ) : (
          <Lottie animationData={CheckedTick} loop autoPlay />
        )}
      </div>
    </div>
  );
};

export default Overlay;
