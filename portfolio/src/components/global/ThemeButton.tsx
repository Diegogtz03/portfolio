"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return iconButton(theme === "dark", setTheme);
};

const iconButton = (dark: boolean, setTheme: (theme: string) => void) => {
  return (
    <div className="group relative">
      <button
        disabled={true}
        onClick={() => setTheme(dark ? "light" : "dark")}
        className="hover:bg-gray-200 rounded-full p-2"
      >
        {dark ? (
          <Image src="/media/icons/sun.svg" alt="sun" width={24} height={24} />
        ) : (
          <Image
            src="/media/icons/moon.svg"
            alt="moon"
            width={24}
            height={24}
          />
        )}
      </button>
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-70 transition-opacity whitespace-nowrap">
        🔒
      </span>
    </div>
  );
};

export default ThemeButton;
