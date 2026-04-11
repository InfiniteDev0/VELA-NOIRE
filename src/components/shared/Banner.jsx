"use client";
import React from "react";
import { usePathname } from "next/navigation";

const bannerContent = {
  "/": (
    <>
      Free Shipping & Return on All Orders Above 75$
    </>
  ),
  "/men": (
    <span>
      Shop the latest in Men’s luxury wear. Free shipping on all orders above
      $75!
    </span>
  ),
  "/women": (
    <span>
      Discover our Women’s collection. Enjoy exclusive offers and free returns!
    </span>
  ),
  "/collections": (
    <span>Explore curated Collections. Limited-time deals available now!</span>
  ),
  "/discover": (
    <span>Discover new arrivals and trending styles. Shop now!</span>
  ),
  "/gifts": (
    <span>
      Perfect Gifts for every occasion. Free gift wrapping on all orders!
    </span>
  ),
  "/sale": <span>Big Sale! Up to 50% off select items. Don’t miss out!</span>,
};

const allowedRoutes = Object.keys(bannerContent);

const Banner = () => {
  const pathname = usePathname();
  // Only show banner on allowed routes
  if (!allowedRoutes.includes(pathname)) return null;

  return (
    <div
      className="bg-black flex items-center justify-center text-white !py-2 w-full z-[60]"
      style={{ position: "sticky", top: 0 }}
    >
      <div className="flex text-[11.5px] font-semibold tracking-wider gap-1 items-center justify-center">
        {bannerContent[pathname]}{" "}
        <p className="tracking-wider ml-2">
          <span className="underline font-semibold transition-all">Sign in</span>{" "}
          <span className="no-underline">or</span>{" "}
          <span className="underline font-bold transition-all">
            Create an Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
