"use client"

import { useRef } from "react"
import type { FilterType } from "@/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { TaskFiltersProps } from "./types"
import { useTabIndicator } from "@/hooks/use-tab-indicator"

export function TaskFilters({ currentFilter, onFilterChange, counts }: TaskFiltersProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "active", label: "Active", count: counts.active },
    { value: "completed", label: "Completed", count: counts.completed },
  ]

  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const indicatorStyle = useTabIndicator(currentFilter, tabsRef)

  return (
    <Tabs value={currentFilter} onValueChange={(value) => onFilterChange(value as FilterType)} className="w-full">
      <TabsList className="relative w-full h-12 p-1 bg-muted/50 backdrop-blur-sm border border-border/50">
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            ref={(el) => {
              tabsRef.current[filter.value] = el
            }}
            className={cn(
              "flex-1 h-10 gap-2 relative transition-all duration-300",
              "data-[state=active]:text-foreground data-[state=active]:z-[2]",
              "data-[state=inactive]:text-muted-foreground data-[state=inactive]:z-[1]",
              "hover:text-foreground",
              "rounded-md",
            )}
          >
            <span className="font-medium">{filter.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold transition-all duration-300",
                "min-w-[24px] text-center",
                currentFilter === filter.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {filter.count}
            </span>
          </TabsTrigger>
        ))}
        <span
          className="absolute bottom-1 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out z-[3]"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </TabsList>
    </Tabs>
  )
}
