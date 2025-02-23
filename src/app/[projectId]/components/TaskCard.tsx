"use client";

import { Calendar, MoreVertical, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
}

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({
  task,
  onDragStart,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <Card
      key={task.id}
      className="cursor-move"
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === "high"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(task)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
        {task.dueDate && (
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(task.dueDate), "PPP")}
          </div>
        )}
      </div>
    </Card>
  );
}
