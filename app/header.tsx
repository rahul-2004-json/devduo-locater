"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./../components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isloggedin = !!session.data;
  console.log(session.data?.user?.image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOutIcon /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn= !!session.data;

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-3 container mx-auto z-10 relative">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-bold hover:underline"
        >
          <Image
            src="/icon.png"
            width="70"
            height="50"
            alt="application icon"
          />
          Dev-Duo Locater
        </Link>

        <nav>
          {isLoggedIn && 
          <div className="flex gap-5">

          <Link 
          className="hover:underline"
          href="/browse">Browse</Link>

          <Link 
          className="hover:underline"
          href="/your-rooms">Your Rooms</Link>

          </div>
          }
        </nav>

        <div className="flex items-center gap-1">
          <ModeToggle />
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon /> Sign In
            </Button>)}
        </div>
      </div>
    </header>
  );
}
