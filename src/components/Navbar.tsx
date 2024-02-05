'use client'
import { signIn } from "next-auth/react";
import React from "react";
import SignInButton from "~/components/SignInButton";


export default function Navbar() {
  return (
    <nav className="z-50 relative bg-white flex h-[60px] items-center justify-between border-b border-b-border px-32 shadow-sm">
      <div className="">
        <ul className="flex items-center space-x-8 text-sm text-muted-foreground">
          <li className="text-2xl font-semibold text-primary">LOGO</li>
          <li>How it works</li>
          <li>How it works</li>
          <li>How it works</li>
        </ul>
      </div>
      <div className="flex items-center space-x-8 text-muted">
        {/* <Link href={"/dada"} className="text-foreground">
          Login
        </Link> */}
        <SignInButton />
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
