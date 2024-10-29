"use client";
import {PostData} from "@/apis";
import {ToastBlank, ToastSuccess} from "@/components/toast";
import {RootState} from "@/stores";
import {UUID1YCODE} from "@/utilities/Code";
import {GetCookie, SaveCookie} from "@/utilities/Cookies";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Dropdown, MenuProps, Popover} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Overlay from "../Overlay";
import {setOverlayLoading} from "@/stores/Theme";
import clsx from "clsx";

type ReactionProps = {
  items: any[];
  items_static: any[];
  entry_id: any;
  reactions: any[];
  reload: () => void;
};

const ReactionComp: FC<ReactionProps> = ({
  entry_id,
  items,
  items_static,
  reactions,
  reload,
}) => {
  const [pre_reaction, setPreReaction] = useState<any[]>(reactions);
  const [isInteract, setIsInteract] = useState(true);

  useEffect(() => {
    reactions && setPreReaction(reactions);
  }, [reactions]);

  const onClick = async (key: any, type: any) => {
    if (!isInteract) return;
    setIsInteract(false);
    const data = {
      id: key,
      created_at: "",
      updated_at: "",
      emoji: "",
      entry_id: "",
      meta_data: "",
      type: type,
    };
    if (!GetCookie()) {
      SaveCookie(UUID1YCODE());
    }

    setPreReaction((prev) => [...prev.slice(0, prev.length - 1), data]);

    const formData = {
      entry_id: Number(entry_id),
      reaction_id: Number(key),
      metadata: {
        user_id: 26,
        first_name: "Đạt",
        last_name: "Nguyễn",
        avatar:
          "https://framerusercontent.com/images/yC2S2Q7IpJCCGVZMDfLBX9hFI.jpg",
      },
    };

    const response = (await PostData(
      `${process.env.NEXT_PUBLIC_NEST_URL}/reactions`,
      formData
    )) as any;
    if (response.code === 200 || response.code === 201) {
      reload();
    }

    setTimeout(() => {
      setIsInteract(true);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 max-h-8">
        {items_static?.map((item) => {
          return (
            <div
              key={item?.key}
              className={clsx(
                "group transition-all duration-500 h-8 gap-2 flex items-center",
                !isInteract && "pointer-events-none"
              )}
              onClick={() => onClick(item.key, item.type)}
            >
              <div className="group-hover:scale-125 transition-all duration-500 group-hover:-mt-5">
                {item.label}
              </div>
              <span className="text-gray-400 text-sm select-none">
                {
                  pre_reaction.filter((reaction) => reaction.type === item.type)
                    .length
                }
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactionComp;
