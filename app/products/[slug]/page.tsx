"use client";
import {GetData} from "@/apis";
import Comments from "@/components/Comments";
import PriceInfoCard from "@/components/PriceInfoCard";
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
          `${process.env.NEXT_PUBLIC_NEST_URL}/entry/data/detail/${ConvertSlug(CleanStringRoute(pathName))}`
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
            `${process.env.NEXT_PUBLIC_NEST_URL}/entry/data/detail/${ConvertSlug(CleanStringRoute(pathName))}`
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
            `${process.env.NEXT_PUBLIC_NEST_URL}/entry/data/detail/${params?.slug}`
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
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <img
            src={`${FindImageValues(products?.content_data)}`}
            alt={""}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {FindValuesWithKey({
                  arrayData: products?.content_data,
                  findKey: "Title",
                })}
              </p>

              <Link
                href={"/"}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

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

            {/* <div className="flex items-center gap-3">
              <div className="product-hearts">
                <img
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {products?.ta}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <img
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <img
                  src="/assets/icons/share.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
            </div> */}
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold line-through">
                $
                {FindValuesWithKey({
                  arrayData: products?.content_data,
                  findKey: "Pirce",
                })}
                00
              </p>

              <p className="text-[21px] text-black opacity-50">
                {FindValuesWithKey({
                  arrayData: products?.content_data,
                  findKey: "Pirce",
                })}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />

                  <p className="text-sm text-primary-orange font-semibold">
                    {/* {products.stars || "25"} */}
                  </p>
                </div>

                <div className="product-reviews">
                  <img
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {/* {products.reviewsCount} */}
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span> of
                buyers have recommended this.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`321`}
              />

              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`321`}
              />

              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`654`}
              />

              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`456`}
              />
            </div>
          </div>

          {/* <Modal
            productId={
              (window !== undefined && params && params?.id?.toString()) || ""
            }
          /> */}
        </div>
      </div>

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

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <img src="/assets/icons/bag.svg" alt="buy" width={22} height={22} />

          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
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

      {/* <div className="px-6">
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
      </div> */}

      {/* <Comments
        reload={() => autoReloadComment()}
        entryId={detail?.id || ""}
        comments={detail_only_comment?.comments || []}
      /> */}
    </div>
  );
};

export default ProductDetails;
