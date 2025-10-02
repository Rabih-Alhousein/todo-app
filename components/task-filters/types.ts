import type { FilterType, TaskCounts } from "@/types"

export interface TaskFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  counts: TaskCounts
}
