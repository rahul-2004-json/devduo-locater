"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./../components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Trash2, LogInIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {deleteAccountAction} from "./actions";


function AccountDropdown() {
  const session = useSession();
  const isloggedin = !!session.data;
  const [open,setOpen]= useState(false);

  console.log(session.data?.user?.image);

  return (
    <>
    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your account data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
         onClick={async ()=>{
          await deleteAccountAction();
          signOut({ callbackUrl: "/" });
         }}
        >Yes,delete my account</AlertDialogAction>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ??""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOutIcon className=" mr-2" /> Sign Out
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem 
         onClick={()=>{
          //delete the room
          setOpen(true);
         }}
        >
           <Trash2  className=" mr-2"/> Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn= !!session.data;

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-3 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
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
          <div className="flex gap-9">

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
