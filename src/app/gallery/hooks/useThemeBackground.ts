import { useEffect, useState } from "react";

export function useThemeBackground() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isDarkMode) {
    return {
      isDarkMode,
      background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
      textColor: "text-white",
      gridOpacity: "rgba(255, 255, 255, 0.1)",
    };
  } else {
    return {
      isDarkMode,
      background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
      textColor: "text-gray-900",
      gridOpacity: "rgba(255, 255, 255, 0.3)",
    };
  }
}
