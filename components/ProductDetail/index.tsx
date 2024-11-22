import {FindImageValues, FindValuesWithKey} from "@/utilities/Find";
import Link from "next/link";
import React, {FC} from "react";
import PriceInfoCard from "../PriceInfoCard";
import ReactionComp from "../ReactionComp";

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
            <p className="text-[21px] text-black opacity-50">
              {products &&
                Number(
                  FindValuesWithKey({
                    arrayData: products?.content_data,
                    findKey: "Price",
                  })
                ) * 1.2}
              $
            </p>
            <p className="text-[34px] text-secondary font-bold line-through">
              {products &&
                FindValuesWithKey({
                  arrayData: products?.content_data,
                  findKey: "Price",
                })}
              00 $
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
        <button className="btn w-full mt-4  mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <img src="/assets/icons/bag.svg" alt="buy" width={22} height={22} />

          <Link
            href={`/checkout/${products?.slug}`}
            className="text-base text-white"
          >
            Buy Now
          </Link>
        </button>
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
  );
};

export default ProductDetail;
