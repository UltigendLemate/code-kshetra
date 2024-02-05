'use client'
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="montserrat flex h-[60px] items-center  justify-between border-b border-b-border bg-background px-32 shadow-sm">
      <div className="">
        <ul className="flex items-center space-x-8 text-sm text-muted-foreground">
          <li className="text-2xl font-semibold text-primary">LOGO</li>
          <li>How it works</li>
          <li>How it works</li>
          <li>How it works</li>
        </ul>
      </div>
      <div className="flex items-center space-x-8 text-muted">
        <Link href={"/dada"} className="text-foreground">
          Login
        </Link>
        <span
        onClick={()=>signIn('google')}
          // href={"/dada"}
          className="font-sem cursor-pointer rounded-sm bg-primary px-3 py-2 hover:bg-secondary-foreground"
        >
          Join Now
        </span>
      </div>
    </nav>
  );
}
