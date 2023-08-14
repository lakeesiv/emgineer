"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SocialIcons from "./social-icons";

const ThemeToggle = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

const Footer = () => {
  return (
    <footer className="w-full p-2 px-4 bg-white border-t border-gray-300 shadow flex items-center justify-between  dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center space-x-6">
        <Link
          href="/credits"
          className="text-emma-primary hover:text-emma-secondary transition-colors font-extrabold"
        >
          Credits
        </Link>
        <Link
          href="/cookies"
          className="text-emma-primary hover:text-emma-secondary transition-colors font-extrabold"
        >
          Cookies
        </Link>
        <SocialIcons />
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
