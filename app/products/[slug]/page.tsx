"use client";
import {GetData} from "@/apis";
import Comments from "@/components/Comments";
import ProductDetail from "@/components/ProductDetail";
import ReactionComp from "@/components/ReactionComp";
import {RootState} from "@/stores";
import {
  setPostDetailOnlyReaction,
  setPostDetailOnlyComment,
  setPostDetail,
} from "@/stores/Post";
import {ContentDetailResponse} from "@/types/DetailContent";
import {ReactionsResponse} from "@/types/Reactions";
import {FindImageValues, FindValuesWithKey} from "@/utilities/Find";
import {ConvertSlug} from "@/utilities/Slug";
import {CleanStringRoute} from "@/utilities/Text";
import axios from "axios";
import dynamic from "next/dynamic";
import {headers} from "next/headers";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Lottie = dynamic(() => import("lottie-react"), {ssr: false});

const ProductDetails = () => {
  const params = useParams();
  const pathName = usePathname();
  const [products, setProducts] = useState<any>(null);

  const {detail, detail_only_reaction, detail_only_comment, relatedPost} =
    useSelector((state: RootState) => state.post);
  const [reactions, setReactions] = useState<any[] | null>(null);
  const [reactions_static, setReactionsStatic] = useState<any[] | null>(null);
  const dispatch = useDispatch();

  const reloadFnc = async (to: "reaction" | "comment") => {
    if (window !== undefined) {
      if (pathName) {
        const response = (await GetData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/entries/data/detail/${ConvertSlug(CleanStringRoute(pathName))}`
        )) as ContentDetailResponse;

        if (response && to === "reaction") {
          dispatch(setPostDetailOnlyReaction(response));
          return;
        }
        if (response && to === "comment") {
          dispatch(setPostDetailOnlyComment(response));
          return;
        }
      }
    }
  };
  useEffect(() => {
    if (window !== undefined) {
      const fetchData = async () => {
        if (pathName) {
          const response = (await GetData(
            `${process.env.NEXT_PUBLIC_NEST_URL}/entries/data/detail/${ConvertSlug(CleanStringRoute(pathName))}`
          )) as ContentDetailResponse;
          // console.log(response);

          if (response) {
            dispatch(setPostDetail(response));
            // dispatch(setPostRelated(response?.result?.data?.relatedPosts));
          }
        }
      };
      reloadFnc("reaction");
      reloadFnc("comment");
      fetchData();
    }
  }, [pathName]);

  useEffect(() => {
    if (window !== undefined) {
      const fetchData = async () => {
        const response = (await GetData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/reactions`
        )) as ReactionsResponse;

        if (response?.code === 200 || response?.code === 201) {
          const items = await Promise.all(
            response.data.map(async (reaction) => {
              const res = await fetch(reaction.emoji);
              if (!res.ok) {
                return null;
              }
              const animationData = await res.json();

              return {
                key: reaction.id.toString(),
                type: reaction.type.toString(),
                label: (
                  <Lottie
                    animationData={animationData}
                    className="w-8 h-8"
                    loop={true}
                    autoplay={true}
                  />
                ),
              };
            })
          );

          if (items) {
            setReactionsStatic(items);
            setReactions(items);
          }
        }
      };

      fetchData();
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = (await GetData(
        `${process.env.NEXT_PUBLIC_NEST_URL}/reactions`
      )) as ReactionsResponse;

      if (response?.code === 200 || response?.code === 201) {
        const items = await Promise.all(
          response.data.map(async (reaction) => {
            const res = await fetch(reaction.emoji);
            const animationData = await res.json();

            return {
              key: reaction.id.toString(),
              type: reaction.type.toString(),
              label: (
                <Lottie
                  animationData={animationData}
                  className="w-8 h-8"
                  loop={true}
                  autoplay={true}
                />
              ),
            };
          })
        );

        setReactionsStatic(items);
      }
    };

    fetchData();
  }, []);

  const autoReloadReaction = async () => {
    reloadFnc("reaction");
  };
  const autoReloadComment = async () => {
    reloadFnc("comment");
  };
  useEffect(() => {
    if (window !== undefined) {
      const fetchData = async () => {
        if (params) {
          const response = await axios(
            `${process.env.NEXT_PUBLIC_NEST_URL}/entries/data/detail/${params?.slug}`
          );

          if (response?.data) {
            setProducts(response?.data);
          }
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div
      className={`product-container ${
        products
          ? "opacity-100 pointer-events-auto select-auto visible"
          : "opacity-0 select-none invisible pointer-events-none"
      } transition-all duration-1000`}
    >
      <ProductDetail
        products={products}
        reactions={reactions}
        reactions_static={reactions_static}
        detail_only_comment={detail_only_comment}
        detail_only_reaction={detail_only_reaction}
        detail={detail}
        autoReloadReaction={autoReloadReaction}
      />

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>

          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{
              __html: `${FindValuesWithKey({
                arrayData: products?.content_data,
                findKey: "Content",
              })}`,
            }}
          />
        </div>
      </div>

      {/* {products && products?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )} */}

      <div className="px-6">
        {reactions &&
          reactions_static &&
          detail_only_comment &&
          detail_only_reaction &&
          detail &&
          reactions?.length > 0 && (
            <ReactionComp
              reload={autoReloadReaction}
              entry_id={detail.id}
              items={reactions}
              items_static={reactions_static}
              reactions={detail_only_reaction.reactions}
            />
          )}
      </div>

      <Comments
        reload={() => autoReloadComment()}
        entryId={detail?.id || ""}
        comments={detail_only_comment?.comments || []}
      />
    </div>
  );
};

export default ProductDetails;
