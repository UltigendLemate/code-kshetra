"use client";
import React from "react";

export default function Video() {
  return (
    <div className="mx-auto my-20 flex h-[90vh] max-w-screen-xl rounded-3xl border-[12px] border-border">
      <video
        width="100%"
        height="100%"
        controls
        autoPlay
        muted
        className="object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
