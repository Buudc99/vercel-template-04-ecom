"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import Image from "next/image";

const heroImage = [
  {imageUrl: "/assets/images/hero-1.svg", alt: "smartwatch"},
  {imageUrl: "/assets/images/hero-2.svg", alt: "bag"},
  {imageUrl: "/assets/images/hero-3.svg", alt: "lamp"},
  {imageUrl: "/assets/images/hero-4.svg", alt: "air fryer"},
  {imageUrl: "/assets/images/hero-5.svg", alt: "chair"},
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
            alt={image.alt}
            width={484}
            height={484}
            key={image.alt}
            className="object-contain"
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
