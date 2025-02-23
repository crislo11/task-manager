"use client";

import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Maybe } from "@/types";

interface TaskForm {
  title: string;
  description: string;
  dueDate: Maybe<Date>;
  priority: "low" | "medium" | "high";
}

interface TaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  taskForm: TaskForm;
  onTaskFormChange: (
    field: keyof TaskForm,
    value: string | Date | null
  ) => void;
  onSave: () => void;
  isEditing: boolean;
}

export function TaskDialog({
  isOpen,
  onOpenChange,
  taskForm,
  onTaskFormChange,
  onSave,
  isEditing,
}: TaskDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-labelledby="task-dialog-title">
        <DialogHeader>
          <DialogTitle id="task-dialog-title">
            {isEditing ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription id="task-dialog-description">
            {isEditing
              ? "Update the task details."
              : "Create a new task for your project board."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={taskForm.title}
              onChange={(e) => onTaskFormChange("title", e.target.value)}
              placeholder="Enter task title"
              aria-label="Task title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={taskForm.description}
              onChange={(e) => onTaskFormChange("description", e.target.value)}
              placeholder="Enter task description"
              aria-label="Task description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !taskForm.dueDate && "text-muted-foreground"
                  }`}
                  aria-label="Select due date"
                >
                  <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                  {taskForm.dueDate
                    ? format(taskForm.dueDate, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={taskForm.dueDate || undefined}
                  onSelect={(date) => onTaskFormChange("dueDate", date || null)}
                  initialFocus
                  aria-label="Calendar for selecting due date"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={taskForm.priority}
              onValueChange={(value: "low" | "medium" | "high") =>
                onTaskFormChange("priority", value)
              }
              aria-label="Select task priority"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" aria-label="Low priority">
                  Low
                </SelectItem>
                <SelectItem value="medium" aria-label="Medium priority">
                  Medium
                </SelectItem>
                <SelectItem value="high" aria-label="High priority">
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            aria-label={isEditing ? "Save changes" : "Add task"}
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
