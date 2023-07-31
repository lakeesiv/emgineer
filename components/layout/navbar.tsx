"use client";

import Link from "next/link";
import Logo from "./logo";
import MobileNav from "./mobile-nav";

const links = [
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Funding",
    href: "/funding",
  },
  {
    name: "About",
    href: "/about",
  },
];

const NavBar = () => {
  return (
    <header
      className="top-0 z-40 flex  flex-row mx-auto w-full md:backdrop-blur-sm"
      id="header"
    >
      <div className="py-2 px-3 mx-auto w-full  md:flex md:justify-between max-w-8xl md:px-4">
        <div className="flex justify-between">
          <a className="flex items-center" href={"/"}>
            <Logo />
          </a>
          <div className="flex items-center md:hidden">
            <MobileNav links={links} />
          </div>
        </div>
        <nav
          className="items-center w-full md:w-auto hidden md:flex h-screen md:h-auto "
          aria-label="Main navigation"
        >
          <ul className="flex flex-col pt-8 md:pt-0 md:flex-row md:self-center w-full md:w-auto text-xl md:text-md font-extrabold text-emma-navy dark:text-emma-pink">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  className="px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}

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
          </ul>
        </nav>
      </div>
      <div className="grid overflow-hidden ">
        <div className="w-16 " style={{ gridArea: "1 / 1" }}>
          <div
            className=" h-24  bg-emma-navy -rotate-45  transform origin-top-left "
            style={{
              background:
                "linear-gradient(90deg, var(--emma-navy) 0 28%, var(--emma-pink) 0 40%, var(--emma-navy) 0 100%)",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
