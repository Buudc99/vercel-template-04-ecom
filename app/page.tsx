"use client";
import React, {useEffect, useState} from "react";
import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import {log} from "console";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {setContent} from "@/stores/Home";
import {ItemSkeleton} from "@/components/skeleton";

const Home = () => {
  const [load, setLoad] = useState(true);
  const {content} = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window !== undefined) {
      const fetchData = async () => {
        setLoad(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEST_URL}/entries/data/list/content`,
          null,
          {
            headers: {
              user_id: `${process.env.NEXT_PUBLIC_USER_ID}`,
              channel_id: `${process.env.NEXT_PUBLIC_CHANNEL_ID}`,
              content_model_id: `${process.env.NEXT_PUBLIC_CONTENT_MODEL}`,
            },
          }
        );

        if (response?.data?.contents?.length > 0) {
          dispatch(setContent(response?.data?.contents));
          // setProducts(response?.data?.contents);
          setLoad(false);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (load) {
      const to = setTimeout(() => {
        setLoad(false);
      }, 10000);
      return clearTimeout(to);
    }
  }, [load]);

  return (
    <>
      <section className="px-6 py-24 md:px-20 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Traveling Starts Here:
              <img
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unstoppable to traveling{" "}
              <span className="text-primary">Travelocation</span>
            </h1>

            <p className="mt-6">
              Relax and peacful for self, challenge your self help you free
              more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="pl-12 pb-24 pr-12 flex flex-col gap-8">
        <h2 className="w-fit flex items-center justify-center text-4xl font-bold mx-auto relative before:content[] before:w-0 before:opacity-0 before:hover:opacity-100 before:rounded-full before:h-1 before:bg-black before:absolute before:-bottom-2 before:left-1/2 before:hover:left-0 before:hover:w-full before:transition-all before:duration-500 before:ease-linear">
          Travels Trending
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {load ? (
            <ItemSkeleton className="col-span-4" />
          ) : (
            <>
              {content?.length > 0 ? (
                content?.map((product) => {
                  return (
                    product?.status === "Published" && (
                      <ProductCard key={product.id} product={product} />
                    )
                  );
                })
              ) : (
                <h1 className="font-bold text-gray-200 w-full text-center text-2xl">
                  Oops, no content found!
                </h1>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
