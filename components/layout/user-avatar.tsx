"use client";

import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

/**
 * The `UserAvatar` component is a React component that displays a user's avatar and name, and provides
 * options to sign in or sign out.
 * @returns The `UserAvatar` component returns JSX elements based on the conditionals and data
 * provided. If there is no session, it returns an `Avatar` component with a fallback icon for logging
 * in. If there is a session, it returns a `DropdownMenu` component with a trigger button displaying
 * the user's avatar and a dropdown menu with the user's name, email, and a logout option.
 */
const UserAvatar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  /* The code block is checking if there is no session (user is not logged in). If there is no session,
it returns an `Avatar` component with a fallback icon for logging in. The `Avatar` component is
clickable and triggers the `signIn` function with the "google" provider as an argument when clicked. */
  if (!session) {
    return (
      <Avatar
        className="h-8 w-8 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer "
        onClick={() => signIn("google")}
      >
        <AvatarFallback className="bg-transparent">
          <LogIn className="h-6 w-6 text-emma-text font-extrabold" />
        </AvatarFallback>
      </Avatar>
    );
  }

  const name = session.user.name as string;
  const email = session.user.email as string;
  const avatarUrl = session.user.image as string;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={name ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
