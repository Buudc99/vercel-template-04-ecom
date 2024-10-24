"use client";
import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
// import { getProductById, getSimilarProducts } from "@/lib/actions";
// import { formatNumber } from "@/lib/utils";
import {Product} from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
type Props = {
  params: {id: string};
};

const ProductDetails = () => {
  const params = useParams();
  const [products, setProducts] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (params) {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_NEST_URL}/entry/data/detail/${params?.id}`
        );

        if (response?.data) {
          setProducts(response?.data);
        }
      }
    };
    fetchData();
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
            src={
              products?.content_data?.find(
                (content: any) => content.slug === "thumbnail"
              )?.value
            }
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
                {products?.name}
              </p>

              <Link
                href={"/"}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <img
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {/* {products?.ta} */}
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
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                $
                {
                  products?.content_data?.find(
                    (content: any) => content.slug === "price"
                  )?.value
                }
              </p>

              <p className="text-[21px] text-black opacity-50 line-through  ">
                {products?.content_data?.find(
                  (content: any) => content.slug === "price"
                )?.value + "00"}
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

          <Modal productId={params && params?.id.toString()} />
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
              __html: `${
                products?.content_data?.find(
                  (content: any) => content.slug === "content"
                )?.value
              }`,
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
    </div>
  );
};

export default ProductDetails;
