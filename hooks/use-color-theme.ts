"use client";

import { useState, useEffect, useCallback } from "react";
import { COLOR_OPTIONS, STORAGE_KEYS } from "@/lib/constants";
export type ColorOption = (typeof COLOR_OPTIONS)[number];

export function useColorTheme() {
  const [mounted, setMounted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    COLOR_OPTIONS[0]
  );

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEYS.PRIMARY_COLOR);
    if (stored) {
      const found = COLOR_OPTIONS.find((c) => c.hue.toString() === stored);
      if (found) {
        setSelectedColor(found);
        applyColor(found);
      }
    }
  }, []);

  const applyColor = useCallback((color: ColorOption) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", color.color);
    root.style.setProperty("--ring", color.color);
    root.style.setProperty("--accent", color.color);
  }, []);

  const changeColor = useCallback(
    (color: ColorOption) => {
      setSelectedColor(color);
      applyColor(color);
      localStorage.setItem(STORAGE_KEYS.PRIMARY_COLOR, color.hue.toString());
    },
    [applyColor]
  );

  // Reapply color when theme changes
  useEffect(() => {
    if (mounted) {
      const observer = new MutationObserver(() => {
        applyColor(selectedColor);
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, [mounted, selectedColor, applyColor]);

  return {
    selectedColor,
    changeColor,
    mounted,
    colorOptions: COLOR_OPTIONS,
  };
}
