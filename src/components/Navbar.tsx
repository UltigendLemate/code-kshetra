"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Coins } from "lucide-react";
import { sessionsRelations } from "~/server/db/schema";

export default function Navbar() {
  const session = useSession();
  console.log("data: ", session);

  return (
    <nav className="montserrat flex h-[60px] items-center  justify-between border-b border-b-border bg-background px-32 shadow-sm">
      <div className="">
        <ul className="flex items-center space-x-8 text-sm text-muted-foreground">
          <li className="text-2xl font-semibold text-primary">
            <Link href={"/"}>QuikPlanr</Link>
          </li>
          <li className="cursor-pointer">How it works</li>
          <li className="cursor-pointer">Pricing</li>
          <li className="cursor-pointer">Resources</li>
        </ul>
      </div>
      <div className="">
        {session?.data?.user ? (
          <div className="flex items-center space-x-5">
            <div className="bord flex cursor-pointer space-x-2 rounded-md border-border p-2 text-yellow-500">
              <p className="text-base text-primary">10 Credits</p>
              <Coins />
            </div>
            <Avatar>
              <AvatarImage src={`${session.data.user.image}`} alt="pfp" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center space-x-8 text-muted">
            <Button onClick={() => signIn("google")}>Login</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
