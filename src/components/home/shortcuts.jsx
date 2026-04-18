import Link from "next/link";
import Image from "next/image";
import React from "react";

const Shortcuts = () => {
  const SHORTCUTS = [
    {
      label: "Luxury Abayas",
      href: "/shop/abayas",
      bgImg: "/assets/images/abaya.png",
    },
    {
      label: "Shayla",
      href: "/shop/shayla",
      bgImg: "/assets/images/shayla.png",
    },
    {
      label: "Fragrances",
      href: "/shop/fragrances",
      bgImg: "/assets/images/fragrance.png",
    },
    {
      label: "Accessories",
      href: "/shop/accessories",
      bgImg: "/assets/images/accessories.png",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
      {SHORTCUTS.map(({ label, href, bgImg }) => (
        <Link
          key={label}
          href={href}
          className="relative h-[40vh] w-full flex items-end p-6 overflow-hidden group hover:brightness-95 transition-all duration-300"
        >
          <Image src={bgImg} alt={label} fill className="object-cover" />
          <span className="relative z-10 text-sm uppercase tracking-[0.2em] text-white font-medium group-hover:underline underline-offset-4">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Shortcuts;
