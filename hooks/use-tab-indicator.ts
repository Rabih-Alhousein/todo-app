"use client";

import { useEffect, useState } from "react";
import type { FilterType } from "@/types";

export function useTabIndicator(
  currentFilter: FilterType,
  tabsRef: React.MutableRefObject<Record<string, HTMLButtonElement | null>>
) {
  const [style, setStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const update = () => {
      const activeTab = tabsRef.current[currentFilter];
      if (!activeTab) return;
      const parent = activeTab.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      setStyle({ left: tabRect.left - parentRect.left, width: tabRect.width });
    };

    update();

    window.addEventListener("resize", update);

    const activeTab = tabsRef.current[currentFilter];
    const parent = activeTab?.parentElement;
    let ro: ResizeObserver | undefined;
    if (parent && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(parent);
    }

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [currentFilter, tabsRef]);

  return style;
}
