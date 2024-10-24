"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
// import {getAllProducts} from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_NEST_URL}/entry/data/list/content?id=${process.env.NEXT_PUBLIC_USER_ID}&channel=${process.env.NEXT_PUBLIC_CHANNEL_ID}&content_type=${process.env.NEXT_PUBLIC_CONTENT_TYPE}`
      );

      if (response?.data?.contents?.length > 0) {
        setProducts(response?.data?.contents);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="px-6 py-24 md:px-20 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of <span className="text-primary">iPrice</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
