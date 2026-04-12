import React from "react";
import { A1, A2, A3, A4 } from "../../../public/assets/images";
import Image from "next/image";

const Ourcollection = () => {
    const Collection = [
      {
        image: A1,
        textOverlay: {
          title: "Seasonal Collections",
          caption:
            "The rhythm of the year, captured in fabric. Explore our rotating drops designed for the current climate and mood.",
          cta: "Explore the Season",
          url: "/collections/seasonal",
        },
      },
      {
        image: A2,
        textOverlay: {
          title: "Rare Collectibles",
          caption:
            "For the connoisseur of modesty. Limited-run pieces featuring hand-stitched details and exclusive fabrics that won't return.",
          cta: "View Rarities",
          url: "/collections/rare-collectibles",
        },
      },
      {
        image: A3,
        textOverlay: {
          title: "Infinity Bride",
          caption:
            "A lifetime of grace begins here. Ethereal whites and ivory silks designed for the modern Muslimah’s most sacred day.",
          cta: "The Bridal Suite",
          url: "/collections/infinity-bride",
        },
      },
      {
        image: A4,
        textOverlay: {
          title: "Modern Muse",
          caption:
            "Where architecture meets apparel. Sharp lines and bold silhouettes for the woman who leads with confidence and style.",
          cta: "Shop Modern Muse",
          url: "/collections/modern-muse",
        },
      },
    ];
  return (
    <section className="w-full h-auto !py-20 !px-8 flex flex-col items-center justify-center bg-white">
      {/* header */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl  font-light tracking-tight text-black ">
          Explore the Exclusive VelaNoire Collections
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-4">
          Inspire by tradional and elegant islamic way of dressing.
        </p>
      </div>

      {/* collection shortcuts */}
      <div className="grid grid-cols-4 gap-5 p-5">
        {Collection.map((item, index) => {
          return (
            <div className="relative" key={index}>
              <Image alt="collection images" src={item.image} />

              {/* overlay text at the bottom left of the image */}
              <div className="absolute">{item.textOverlay.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Ourcollection;
