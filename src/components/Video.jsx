"use client";
import React from "react";

export default function Video() {
  return (
    <div className="">
      <video
        width="100%"
        height="100%"
        controls
        autoPlay
        muted
        className="rounded-lg object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
