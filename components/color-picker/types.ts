import type { ColorOption } from "@/types"

export interface ColorButtonProps {
  color: ColorOption
  isSelected: boolean
  onClick: () => void
}
