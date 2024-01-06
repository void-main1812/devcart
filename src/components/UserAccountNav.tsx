"use client";

import { LogOut, ShoppingCart, UserCheck2 } from "lucide-react";
import Link from "next/link";
import { User } from "../payload-type";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../hooks/use-auth";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          variant={"outline"}
          size={"sm"}
          className="relative flex justify-center items-center gap-x-4"
        >
          <UserCheck2 className="h-4 w-4" />
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white w-60 shadow-lg rounded-lg space-y-2 "
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <h1 className="font-medium text-sm text-black">{user.email}</h1>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-zinc-300" />
        <DropdownMenuItem asChild>
          <Link href="/sell" className="flex justify-start items-center gap-2">
            {" "}
            <ShoppingCart className="h-4 w-4" /> Seller DashBoard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer flex justify-start items-center gap-2 text-red-400 focus:text-red-500 focus:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log-Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
