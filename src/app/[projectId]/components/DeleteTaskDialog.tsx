"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Maybe, Task } from "@/types";

interface DeleteTaskDialogProps {
  taskToDelete: Maybe<Task>;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteTaskDialog({
  taskToDelete,
  onOpenChange,
  onDelete,
}: DeleteTaskDialogProps) {
  return (
    <AlertDialog open={!!taskToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle id="delete-task-dialog-title">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription id="delete-task-dialog-description">
            This action cannot be undone. This will permanently delete the task
            &quot;{taskToDelete?.title}&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            aria-label="Cancel deletion"
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            aria-label="Confirm deletion"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
