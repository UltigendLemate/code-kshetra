"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export default function Waiting() {
  const slides = [
    "loading-1.gif",
    "loading-2.gif",
    "loading-3.gif",
    "loading-4.gif",
    "loading-5.gif",
  ];
  const loadingTexts = [
    "Loading...",
    "Please wait...",
    "Hold on tight...",
    "Almost there...",
    "Fetching data...",
  ];

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    console.log(slide);
    loadingTexts[slide] = "Fetching data...";
    const timeoutId = setTimeout(() => {
      setSlide((prevSlide) => (prevSlide + 1) % 5);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [slide]);

  // for (let i = 0; i < 5; i++) {

  // }
  return (
    <div className="loading-parent flex items-center justify-center">
      <div className="loading-child ">
        <Image
          src={`/${slides[slide]}`}
          height={225}
          width={300}
          className=" object-contain"
          alt="loading..."
        />
        <p className="  text-center text-4xl font-bold text-primary ">
          {loadingTexts[slide]}
        </p>
      </div>
    </div>
  );
}
