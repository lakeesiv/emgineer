"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={60}
      height={60}
      style={{
        filter: "var(--logo-filter)",
      }}
    />
  );
};

export default Logo;
