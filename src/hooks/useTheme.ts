import { useState } from "react";

export const useTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const initialIsDark =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);

  const [isDark, setIsDark] = useState(initialIsDark);

  // 테마 변경 시 localStorage에 저장
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDark, toggleTheme };
};
