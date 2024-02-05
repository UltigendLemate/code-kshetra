"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
export default function Waiting() {
  const slides = [
    "loading-1.gif",
    "loading-2.gif",
    "loading-3.gif",
    "loading-4.gif",
    "loading-5.gif",
  ];
  const loadingTexts = [
    "Exploring the web for you...",
    "Collecting relevant data...",
    "Putting everything together...",
    "Getting the perfect theme...",
    "We're almost there...",
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

  return (
    <div className=" flex items-center justify-center h-screen">
      <div className="h-1/2 grid w-full">
        <div className="loadingImage object-contain relative flex flex-col justify-end items-center">
        <Image
          src={`/${slides[slide]}`}
          height={300}
          width={300}
          className=" object-contain"
          alt="loading..."
        />
        </div>
        <p className="  text-center text-3xl font-medium">
          {loadingTexts[slide]}
        </p>
      </div>
    </div>
  );
}
