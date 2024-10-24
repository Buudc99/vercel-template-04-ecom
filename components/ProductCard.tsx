import {Product} from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  product: any;
}
const ProductCard = ({product}: Props) => {
  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-card_img-container">
        <img
          src={
            product?.content_data?.find(
              (content: any) => content.slug === "thumbnail"
            )?.value
          }
          alt={
            product?.content_data?.find(
              (content: any) => content.slug === "title"
            )?.value
          }
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">
          {
            product?.content_data?.find(
              (content: any) => content.slug === "title"
            )?.value
          }
        </h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product?.taxonomies
              ?.find((content: any) => content.slug === "categories")
              ?.terms?.map((item: any) => (
                <span>{item}</span>
              ))}
          </p>

          <p className="text-black text-lg font-semibold flex gap-6">
            <span>
              {product?.content_data?.find(
                (content: any) => content.slug === "price"
              )?.value + "00"}
              $
            </span>
            <span className="line-through">
              {
                product?.content_data?.find(
                  (content: any) => content.slug === "price"
                )?.value
              }
              $
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
