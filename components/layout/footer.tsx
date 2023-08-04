"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ThemeToggle = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

const Footer = () => {
  return (
    <footer className="w-full p-2 px-4 bg-white border-t border-gray-300 shadow flex items-center justify-between  dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center space-x-6">
        <div className="text-emma-text font-extrabold ">
          Emgineers {new Date().getFullYear()}
        </div>
        <Link
          href="/credits"
          className="text-emma-text hover:text-emma-text-secondary transition-colors font-extrabold"
        >
          Credits
        </Link>
        <Link
          href="/cookies"
          className="text-emma-text hover:text-emma-text-secondary transition-colors font-extrabold"
        >
          Cookies
        </Link>
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
