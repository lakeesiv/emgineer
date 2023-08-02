"use client";
import React from "react";
import dynamic from "next/dynamic";

const ThemeToggleNoSSR = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

const Footer = () => {
  return (
    <footer className="w-full p-2 px-4 bg-white border-t border-gray-300 shadow flex items-center justify-between  dark:bg-gray-800 dark:border-gray-600">
      <div className="text-emma-text font-extrabold ">
        Emgineers | {new Date().getFullYear()}
      </div>
      <ThemeToggleNoSSR />
    </footer>
  );
};

export default Footer;
