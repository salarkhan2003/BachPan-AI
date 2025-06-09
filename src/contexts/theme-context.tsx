
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        return storedTheme;
      }
    }
    return "system";
  });

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (currentTheme: Theme) => {
      let newEffectiveTheme: "light" | "dark";
      if (currentTheme === "system") {
        newEffectiveTheme = systemPrefersDark.matches ? "dark" : "light";
      } else {
        newEffectiveTheme = currentTheme;
      }

      root.classList.remove("light", "dark");
      root.classList.add(newEffectiveTheme);
      setEffectiveTheme(newEffectiveTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", currentTheme);
      }
    };

    applyTheme(theme);

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    systemPrefersDark.addEventListener("change", handleChange);
    return () => {
      systemPrefersDark.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = useMemo(() => ({ theme, effectiveTheme, setTheme }), [theme, effectiveTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
