"use client";
import React from "react";
import ThemeToggle from "./theme-toggle";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-2 px-4 bg-white border-t border-gray-400 shadow flex items-center justify-between  dark:bg-gray-900 dark:border-gray-600">
      <div className="text-emma-text font-extrabold ">
        Emgineers | {new Date().getFullYear()}
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
