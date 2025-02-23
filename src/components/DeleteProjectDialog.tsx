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
import type { Maybe, Project } from "@/types";

interface DeleteProjectDialogProps {
  projectToDelete: Maybe<Project>;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteProjectDialog({
  projectToDelete,
  onOpenChange,
  onDelete,
}: DeleteProjectDialogProps) {
  return (
    <AlertDialog open={!!projectToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle id="delete-project-dialog-title">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription id="delete-project-dialog-description">
            This action cannot be undone. This will permanently delete the
            project <strong>{projectToDelete?.title}</strong> and all of its
            tasks.
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
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
