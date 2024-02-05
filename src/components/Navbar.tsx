'use client'
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className="z-50 relative bg-white flex h-[60px] items-center justify-between border-b border-b-border px-32 shadow-sm">
      <div className="">
        <ul className="flex items-center space-x-8 text-sm text-muted-foreground">
          <li className="text-2xl font-semibold text-primary">
            <Link href={"/"} className="">
            QuickPlanr
              </Link>
            </li>
          <li>How it works</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul>
      </div>
      <div className="flex items-center space-x-8 text-muted">
        <Link href={"/dada"} className="text-foreground">
          Login
        </Link> 
        <Button>
          <Link href={"/dada"} className="">
            Join Now
          </Link>
        </Button>
      </div>
    </nav>
  );
}
