"use client";

import React from "react";
import ThemeToggle from "./theme-toggle";

const NavBar = () => {
  return (
    <header
      className="top-0 z-40  flex-none mx-auto w-full md:backdrop-blur-sm border-b dark:border-b-0"
      id="header"
    >
      <div className="py-2 px-3 mx-auto w-full md:flex md:justify-between max-w-8xl md:px-4">
        <div className="flex justify-between">
          <a className="flex items-center" href={"/"}>
            {/* <Logo /> */}
            Emgineer
          </a>
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            {/* <ToggleMenu /> */}
          </div>
        </div>
        <nav
          className="items-center w-full md:w-auto hidden md:flex h-screen md:h-auto"
          aria-label="Main navigation"
        >
          <ul className="flex flex-col pt-8 md:pt-0 md:flex-row md:self-center w-full md:w-auto text-xl md:text-sm">
            <li>
              <a
                className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                href={"/blog"}
              >
                Blog
              </a>
            </li>
            {/* <li className="hidden md:block">
              <div className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 md:flex items-center transition duration-150 ease-in-out">
                <DropdownNav client:load />
              </div>
            </li>
            <li className="block md:hidden">
              <div className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 md:flex items-center transition duration-150 ease-in-out">
                <DropdownNav client:load mobile />
              </div>
            </li> */}

            <li>
              <a
                className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                href="/about"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                href="/contact"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="md:self-center flex items-center mb-4 md:mb-0 ml-2">
            <div className="hidden items-center md:flex">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
