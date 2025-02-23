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
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">No sorting</SelectItem>
        <SelectItem value="dueDate-asc">Due Date (Ascending)</SelectItem>
        <SelectItem value="dueDate-desc">Due Date (Descending)</SelectItem>
      </SelectContent>
    </Select>
  );
}
