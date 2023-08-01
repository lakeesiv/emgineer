"use client";

import React, { FC } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "components/ui/button";

interface MobileNavProps {
  links: { name: string; href: string }[];
}

const MobileNav: FC<MobileNavProps> = ({ links }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          <Menu className="h-[1.25rem] w-[1.25rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map((link) => (
          <DropdownMenuItem key={link.name}>
            <Link
              href={link.href}
              className="text-emma-navy dark:text-emma-pink font-extrabold"
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
