"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useColorTheme } from "@/hooks/use-color-theme"
import { cn } from "@/lib/utils"
import type { ColorButtonProps } from "./types"

export function ColorPicker() {
  const { selectedColor, changeColor, mounted, colorOptions } = useColorTheme()

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Palette className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="transition-transform hover:scale-105 bg-transparent">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change theme color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-2">Theme Color</h4>
            <p className="text-xs text-muted-foreground">Choose your preferred accent color</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <ColorButton
                key={color.hue}
                color={color}
                isSelected={selectedColor.hue === color.hue}
                onClick={() => changeColor(color)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function ColorButton({ color, isSelected, onClick }: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-12 rounded-md transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected && "ring-2 ring-ring ring-offset-2 ring-offset-background",
      )}
      style={{ backgroundColor: color.color }}
      title={color.name}
      aria-label={`Select ${color.name} theme`}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white shadow-lg" />
        </div>
      )}
    </button>
  )
}
