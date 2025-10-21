"use client";
import { countries } from "@/lib/constants";
import { getCookie, setCookie } from "@/lib/cookies";
import { useState, useEffect } from "react";

export function useCountry() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const saved = getCookie("country");
    if (saved) setCountry(JSON.parse(saved));
  }, []);

  // const selectCountry = (code: string) => {
  //   const selected = countries.find(c => c.code === code);
  //   if (selected) {
  //     setCountry(selected);
  //     setCookie("country", JSON.stringify(selected), 30);
  //   }
  // };

  return { country, selectCountry };
}
