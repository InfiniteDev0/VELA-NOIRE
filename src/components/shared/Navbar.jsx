"use client";

import Image from "next/image";
import { logo } from "../../../public/assets/images";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-3 items-center justify-between !px-5 !py-5 bg-gray-100">
        <div>
          menu search
        </div>
        <div className="flex items-center justify-center">
          <Image src={logo} className="w-35" alt="Brand logo"/>
        </div>
        <div className="flex items-center justify-end">
          call us wishlist
          profile bag
        </div>
    </nav>
  );
}
