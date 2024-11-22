import {Product} from "@/types";
import {
  FindImageValues,
  FindValuesWithKey,
  FindValueWithKey,
} from "@/utilities/Find";
import Link from "next/link";
import React, {FC} from "react";
interface Props {
  product: any;
}
const ProductCard: FC<Props> = ({product}) => {
  return (
    <Link
      key={product.id}
      href={`/products/${product.slug}`}
      className="product-card"
    >
      <div className="product-card_img-container">
        <img
          src={`${product && JSON.parse(FindValuesWithKey({arrayData: product?.content_data, findKey: "Image"}))[0]}`}
          alt={""}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">
          {product &&
            FindValuesWithKey({
              arrayData: product?.content_data,
              findKey: "Title",
            })}
        </h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product?.taxonomies?.map((item: any, i: number) => {
              if (item === "categories") {
                return (
                  <div key={i + "o"}>
                    {item?.map((category: any, index: number) => (
                      <span key={category.slug || index}>{category.name}</span>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </p>

          <p className="text-black text-lg font-semibold flex gap-6">
            <span>
              {product &&
                FindValuesWithKey({
                  arrayData: product?.content_data,
                  findKey: "Price",
                })}
              $
            </span>
            <span className="text-gray-500 line-through">
              {product &&
                Number(
                  FindValuesWithKey({
                    arrayData: product?.content_data,
                    findKey: "Price",
                  })
                ) * 1.2}
              $
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
