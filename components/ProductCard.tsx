import {Product} from "@/types";
import {stripHtmlTags} from "@/utilities/FilterHtmlString";
import {
  FindImageValues,
  FindValuesWithKey,
  FindValueWithKey,
} from "@/utilities/Find";
import {Icon} from "@iconify/react/dist/iconify.js";
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
      className="animate-fade rounded-3xl overflow-hidden shadow group hover:shadow-xl transition-all w-full duration-300 ease-linear relative aspect-[0.85]"
    >
      <div className=" bg-slate-50 h-full w-full overflow-hidden z-[1] relative">
        <img
          src={`${product && JSON.parse(FindValuesWithKey({arrayData: product?.content_data, findKey: "Image"}))[0]}`}
          alt={""}
          className="h-full w-auto object-cover group-hover:scale-105 transition-all ease-linear duration-500"
        />
      </div>

      <div className="flex flex-col gap-3 p-6 h-1/2 z-[3] absolute justify-between transition-all duration-500 -bottom-[4.2rem] group-hover:bottom-0 w-full bg-white">
        <div className="h-fit w-full">
          <h3 className="product-title">
            {product &&
              FindValuesWithKey({
                arrayData: product?.content_data,
                findKey: "Title",
              })}
          </h3>

          <div className="flex flex-col gap-1 mt-2">
            <span className="line-clamp-1 text-gray-400 text-xs">
              {product &&
                stripHtmlTags(
                  FindValuesWithKey({
                    arrayData: product?.content_data,
                    findKey: "Short description",
                  })
                )}
            </span>
            <div className="text-black text-sm font-semibold flex gap-2">
              <span>
                {product &&
                  FindValuesWithKey({
                    arrayData: product?.content_data,
                    findKey: "Price",
                  })}
                $
              </span>
              -
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
            </div>
          </div>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className={`h-[2.6rem] gap-2 w-full rounded-full shadow-sm group flex items-center justify-center bg-blue-200 hover:bg-blue-100 transition-all duration-500 ease-linear`}
        >
          Go detail
          <Icon
            icon="ph:arrow-right"
            fontSize={20}
            className="group-hover:ml-3 delay-300 transition-all duration-300 ease-linear"
          />
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;
