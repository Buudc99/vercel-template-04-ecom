"use client";
import axios from "axios";
// import { scrapeAndStoreProduct } from "@/lib/actions";
import React, {FormEvent, useState} from "react";
import {ToastCustom} from "./toast";
import {Icon} from "@iconify/react/dist/iconify.js";
import {headers} from "next/headers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {setContent} from "@/stores/Home";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (searchPrompt.length > 2000) {
        ToastCustom({
          msg: "The prompt is too long",
          icon: (
            <Icon
              icon="ph:warning-fill"
              className="text-yellow-600"
              fontSize={16}
            />
          ),
        });
        return;
      }

      const formData = {
        search: searchPrompt,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_URL}/entries/data/list/content`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            user_id: process.env.NEXT_PUBLIC_USER_ID,
            channel_id: process.env.NEXT_PUBLIC_CHANNEL_ID,
            content_model_id: process.env.NEXT_PUBLIC_CONTENT_MODEL,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(setContent(response.data?.contents));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex flex-wrap gap-4 mt-12 p-2 justify-center group before:group-active:w-full items-center before:rounded-xl relative before:content[] before:transition-all before:duration-500 before:w-full before:absolute before:bg-neutral-black before:h-full before:z-[1]"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter your place"
        className="searchbar-input z-[2] relative"
        value={searchPrompt}
        // disabled={searchPrompt=== ''}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="z-[2] relative !border-none !bg-neutral-black searchbar-btn"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
