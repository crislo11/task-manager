"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSheetProps {
  priorityFilters: string[];
  setPriorityFilters: (filters: string[]) => void;
}

export function FilterSheet({
  priorityFilters,
  setPriorityFilters,
}: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Open filters">
          <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
          Filter
          {priorityFilters.length > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {priorityFilters.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" aria-labelledby="filter-sheet-title">
        <SheetHeader>
          <SheetTitle id="filter-sheet-title">Filter Tasks</SheetTitle>
          <SheetDescription id="filter-sheet-description">
            Filter tasks by priority
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            <Label htmlFor="priority-filters">Priority</Label>
            <div
              className="space-y-2"
              role="group"
              aria-labelledby="priority-filters"
            >
              {["low", "medium", "high"].map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <Checkbox
                    id={priority}
                    checked={priorityFilters.includes(priority)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPriorityFilters([...priorityFilters, priority]);
                      } else {
                        setPriorityFilters(
                          priorityFilters.filter((p) => p !== priority)
                        );
                      }
                    }}
                    aria-label={`Filter by ${priority} priority`}
                  />
                  <Label htmlFor={priority} className="capitalize">
                    {priority}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
