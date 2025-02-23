"use client";

import { Calendar, MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/date";
import { Timestamp } from "firebase/firestore";
import type { Maybe, Task } from "@/types";

interface TaskCardProps {
  task: Maybe<Task>;
  onDragStart: (task: Maybe<Task>) => void;
  onEdit: (task: Maybe<Task>) => void;
  onDelete: (task: Maybe<Task>) => void;
}

export function TaskCard({
  task,
  onDragStart,
  onEdit,
  onDelete,
}: TaskCardProps) {
  if (!task) return null;

  return (
    <Card
      key={task.id}
      className="cursor-move"
      draggable
      onDragStart={() => onDragStart(task)}
      aria-label={`Task: ${task.title}. Drag to move.`}
      tabIndex={0}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium" tabIndex={0}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === "high"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
              aria-label={`Priority: ${task.priority}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Open task options menu"
                >
                  <MoreVertical className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onEdit(task)}
                  aria-label="Edit task"
                >
                  <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(task)}
                  aria-label="Delete task"
                >
                  <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground" tabIndex={0}>
          {task.description}
        </p>
        {task.dueDate && (
          <div
            className="mt-4 flex items-center text-sm text-muted-foreground"
            tabIndex={0}
          >
            <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
            {formatDate(task?.dueDate as unknown as Maybe<Timestamp>)}
          </div>
        )}
      </div>
    </Card>
  );
}
