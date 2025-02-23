"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/tag-input";
import type { Maybe, Project } from "@/types";

interface EditProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Maybe<Project>;
  onEditProject: () => void;
  setEditingProject: (project: Maybe<Project>) => void;
}

export function EditProjectDialog({
  isOpen,
  onOpenChange,
  editingProject,
  onEditProject,
  setEditingProject,
}: EditProjectDialogProps) {
  if (!editingProject) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-labelledby="edit-project-dialog-title">
        <DialogHeader>
          <DialogTitle id="edit-project-dialog-title">Edit Project</DialogTitle>
          <DialogDescription id="edit-project-dialog-description">
            Update your project details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={editingProject.title}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  title: e.target.value,
                })
              }
              placeholder="Enter project title"
              disabled={!editingProject}
              aria-label="Project title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editingProject.description || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
              placeholder="Enter project description"
              disabled={!editingProject}
              aria-label="Project description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-members">Members</Label>
            <TagInput
              value={editingProject.members}
              onChange={(members) =>
                setEditingProject({
                  ...editingProject,
                  members,
                })
              }
              placeholder="Write email of member and press Enter..."
              aria-label="Project members"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            aria-label="Cancel editing project"
          >
            Cancel
          </Button>
          <Button onClick={onEditProject} aria-label="Save changes">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
