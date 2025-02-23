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
import type { Project } from "@/types";

interface EditProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  onEditProject: () => void;
  setEditingProject: (project: Project | null) => void;
}

export function EditProjectDialog({
  isOpen,
  onOpenChange,
  editingProject,
  onEditProject,
  setEditingProject,
}: EditProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Update your project details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Project Title</Label>
            <Input
              id="edit-title"
              value={editingProject?.title || ""}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                  });
                }
              }}
              placeholder="Enter project title"
              disabled={!editingProject}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editingProject?.description || ""}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  });
                }
              }}
              placeholder="Enter project description"
              disabled={!editingProject}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onEditProject}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
