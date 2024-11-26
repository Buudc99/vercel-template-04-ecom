import {FindImageValues, FindValuesWithKey} from "@/utilities/Find";
import Link from "next/link";
import React, {FC, useEffect, useState} from "react";
import PriceInfoCard from "../PriceInfoCard";
import ReactionComp from "../ReactionComp";
import {stripHtmlTags} from "@/utilities/FilterHtmlString";

type ProductDetailProps = {
  products: any;
  reactions: any;
  reactions_static: any;
  detail_only_comment: any;
  detail_only_reaction: any;
  detail: any;
  autoReloadReaction: () => void;
};

const ProductDetail: FC<ProductDetailProps> = ({
  products,
  reactions,
  reactions_static,
  detail_only_comment,
  detail_only_reaction,
  detail,
  autoReloadReaction,
}) => {
  const [toPrice, setToPrice] = useState(true);
  const [toPriceReal, setToPriceReal] = useState(true);

  const priceRender = () => {
    return (
      <p className="text-[21px] text-black opacity-50 line-through">
        {products &&
          Number(
            FindValuesWithKey({
              arrayData: products?.content_data,
              findKey: "Price",
            })
          ) * 1.2}
        $
      </p>
    );
  };
  const priceRenderReality = () => {
    return (
      <p className="text-[34px] text-secondary font-bold ">
        {products &&
          FindValuesWithKey({
            arrayData: products?.content_data,
            findKey: "Price",
          })}
        $
      </p>
    );
  };

  useEffect(() => {
    if (toPrice || toPriceReal) {
      const to = setTimeout(() => {
        setToPrice(false);
        setToPriceReal(false);
      }, 3000);
      return () => clearTimeout(to);
    }
  }, [toPrice, toPriceReal]);

  return (
    <div className="flex gap-28 xl:flex-row flex-col">
      <div className="product-image">
        <img
          src={`${products && JSON.parse(FindValuesWithKey({arrayData: products?.content_data, findKey: "Image"}))[0]}`}
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
        </div>
        <div className="product-info">
          <div className="flex flex-col gap-2 w-full">
            {toPrice ? (
              <div className="h-6 w-full rounded-full animate-pulse bg-slate-300"></div>
            ) : (
              priceRender()
            )}
            {toPriceReal ? (
              <div className="h-8 w-full rounded-full animate-pulse bg-slate-300"></div>
            ) : (
              priceRenderReality()
            )}
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
        <Link
          href={`/checkout/${products?.slug}`}
          className="text-base text-white"
        >
          <button className="btn w-full mt-4  mx-auto flex items-center justify-center gap-3 min-w-[200px]">
            <img src="/assets/icons/bag.svg" alt="buy" width={22} height={22} />
            Buy Now
          </button>
        </Link>
        <div className="my-7 flex flex-col gap-5">
          <span>
            {stripHtmlTags(
              FindValuesWithKey({
                arrayData: products?.content_data,
                findKey: "Short description",
              })
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
