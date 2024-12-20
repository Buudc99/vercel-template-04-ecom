import {FC} from "react";

export const PageSkeleton = () => {
  return (
    <div className={`product-container transition-all duration-1000`}>
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>

          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>

      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      </div>

      <div className="flex items-center mt-4">
        <svg
          className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};
type ItemSkeletonProps = {
  className?: string;
};
export const ItemSkeleton: FC<ItemSkeletonProps> = ({className}) => {
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {Array.from({length: 4}).map((_, index) => (
        <div
          key={index}
          role="status"
          className="col-span-1 max-w-sm p-4  rounded  animate-pulse md:p-6 "
        >
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export const DetailProductPageSkeleton = () => {
  return (
    <div className="product-container opacity-100 pointer-events-auto select-auto visible transition-all duration-1000">
      <div className="flex gap-28 xl:flex-row flex-col">
        {/* Product Image Skeleton */}
        <div className="product-image">
          <div className="w-[580px] h-[400px] bg-slate-300 mx-auto rounded-lg animate-pulse"></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              {/* Title */}
              <div className="h-8 w-[200px] bg-slate-300 rounded-full animate-pulse"></div>
              {/* Link */}
              <div className="h-4 w-[100px] bg-slate-300 rounded-full animate-pulse"></div>
            </div>
            <div className="px-6">
              {/* Reaction Component Placeholder */}
              <div className="h-10 w-[120px] bg-slate-300 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Product Pricing Skeleton */}
          <div className="product-info flex flex-col gap-2 w-full">
            <div className="h-6 w-full rounded-full animate-pulse bg-slate-300"></div>
            <div className="h-8 w-full rounded-full animate-pulse bg-slate-300"></div>
          </div>

          {/* Product Reviews Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="product-stars h-6 w-6 bg-slate-300 rounded-full animate-pulse"></div>
              <div className="product-reviews h-6 w-6 bg-slate-300 rounded-full animate-pulse"></div>
            </div>
            <p className="h-4 w-[150px] bg-slate-300 rounded-full animate-pulse"></p>
          </div>

          {/* Buy Now Button */}
          <div className="mt-4">
            <div className="h-12 w-full bg-slate-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Short Description */}
          <div className="my-7 flex flex-col gap-5">
            <div className="h-4 w-full bg-slate-300 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-slate-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <div className="h-6 w-[200px] bg-slate-300 rounded-full animate-pulse"></div>
          <div className="h-4 w-full bg-slate-300 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-slate-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Comments Skeleton */}
      <div className="px-6">
        <div className="h-10 w-full bg-slate-300 rounded-lg animate-pulse"></div>
        <div className="h-20 w-full bg-slate-300 rounded-lg animate-pulse mt-4"></div>
      </div>
    </div>
  );
};
