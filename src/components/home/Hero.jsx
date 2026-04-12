import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { A1, A2, A3, A4 } from "../../../public/assets/images";
import Image from "next/image";

const Hero = () => {
  const Collection = [
    {
      image: A4,
      textOverlay: {
        title: "Floral Grace",
        caption:
          "Chapter I: The Awakening. Delicate textures and botanical whispers",
        cta: "Explore Spring",
        url: "/collections/spring-floral-grace",
      },
    },
    {
      image: A1,
      textOverlay: {
        title: "Desert Bloom",
        caption: "Chapter II: The Radiant Heat. High-breathability georgette",
        cta: "Shop Summer",
        url: "/collections/summer-desert-bloom",
      },
    },
    {
      image: A3,
      textOverlay: {
        title: "Amber Luxe",
        caption: "Chapter III: The Falling Leaf. Deep tones and rich.",
        cta: "Discover Autumn",
        url: "/collections/autumn-amber-luxe",
      },
    },
    {
      image: A2,
      textOverlay: {
        title: "Velvet Moon",
        caption:
          "Chapter IV: The Midnight Chill. Weighted fabrics and deep lunar hues.",
        cta: "View Winter",
        url: "/collections/winter-velvet-moon",
      },
    },
  ];

  return (
    <div className="relative h-[95vh] grid grid-cols-4 w-full overflow-hidden">
      {Collection.map((item, index) => {
        return (
          <div
            key={index}
            className="relative h-full w-full group cursor-pointer flex items-end"
          >
            {/* 1. Background Image */}
            <Image
              src={item.image}
              alt={item.textOverlay.title}
              fill
              className="object-cover  backdrop-grayscale-25 transition-transform duration-700 "
            />
          </div>
        );
      })}

      {/* text container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full">
        <p className="text-7xl text-white">Midnight Bloom</p>
        <p className="text_paragraph text-white">
          The looks to keep you cool all season.
          sunbasked occasions.
        </p>
        {/* cta */}
        
      </div>
    </div>
  );
};

export default Hero;
