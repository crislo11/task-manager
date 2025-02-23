"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "none" | "dueDate-asc" | "dueDate-desc";

interface SortSelectProps {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export function SortSelect({ sortBy, setSortBy }: SortSelectProps) {
  return (
    <Select
      value={sortBy}
      onValueChange={(value: SortOption) => setSortBy(value)}
      aria-label="Sort tasks by due date"
    >
      <SelectTrigger className="w-[180px]" aria-labelledby="sort-select-label">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none" aria-label="No sorting">
          No sorting
        </SelectItem>
        <SelectItem value="dueDate-asc" aria-label="Sort by due date ascending">
          Due Date (Ascending)
        </SelectItem>
        <SelectItem
          value="dueDate-desc"
          aria-label="Sort by due date descending"
        >
          Due Date (Descending)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
