"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import Image from "next/image";
import {Hero1, Hero2, Hero3, Hero4, Hero5} from "@/assets/images";

const heroImage = [
  {imageUrl: Hero1.src},
  {imageUrl: Hero2.src},
  {imageUrl: Hero3.src},
  {imageUrl: Hero4.src},
  {imageUrl: Hero5.src},
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        infiniteLoop
        // interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImage.map((image) => (
          <img
            src={image.imageUrl}
            height={484}
            className="object-fill aspect-square"
          />
        ))}
      </Carousel>

      <img
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
