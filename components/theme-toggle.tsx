"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // if (typeof window !== "undefined") {
    //   const theme = localStorage.getItem("theme");
    //   if (theme) {
    //     setTheme(theme);
    //   }
    // }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning>
      The current theme is: {theme}
      <Button suppressHydrationWarning onClick={() => setTheme("light")}>
        Light Mode
      </Button>
      <Button suppressHydrationWarning onClick={() => setTheme("dark")}>
        Dark Mode
      </Button>
      <Button suppressHydrationWarning onClick={() => setTheme("pink")}>
        Pink Mode
      </Button>
    </div>
  );
};

export default ThemeChanger;
