"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/ui/tag-input";
import { useCollection } from "@/hooks/useCollection";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { EditProjectDialog } from "@/components/EditProjectDialog";
import { DeleteProjectDialog } from "@/components/DeleteProjectDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Maybe, Project } from "@/types";

export default function ProjectList() {
  const {
    data: projects,
    loading,
    deleteItem,
    addItem,
    updateItem,
  } = useCollection<Project>("projects");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    members: [] as string[],
  });
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Maybe<Project>>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Maybe<Project>>(null);

  const handleAddProject = async () => {
    if (!newProject.title.trim()) return;

    const projectData: Omit<Project, "id"> = {
      title: newProject.title,
      description: newProject.description || null,
      members: newProject.members,
    };

    const success = await addItem(projectData);

    if (success) {
      setNewProject({ title: "", description: "", members: [] });
      setIsNewProjectDialogOpen(false);
      toast.success("Project created successfully");
    } else {
      toast.error("Error creating project");
    }
  };

  const handleEdit = (project: Maybe<Project>) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleEditProject = async () => {
    if (!editingProject?.id || !editingProject.title.trim()) return;

    const success = await updateItem(editingProject.id, {
      title: editingProject.title,
      description: editingProject.description,
      members: editingProject.members,
    });

    if (success) {
      setIsEditDialogOpen(false);
      setEditingProject(null);
      toast.success("Project updated successfully");
    } else {
      toast.error("Error updating project");
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete?.id) return;

    const success = await deleteItem(projectToDelete.id);
    if (success) {
      setProjectToDelete(null);
      toast.success("Project deleted successfully");
    } else {
      toast.error("Error deleting project");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage and track all your projects
            </p>
          </div>
          <ThemeToggle />
          <Dialog
            open={isNewProjectDialogOpen}
            onOpenChange={setIsNewProjectDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project for your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter project title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Members</Label>
                  <TagInput
                    value={newProject.members}
                    onChange={(members) =>
                      setNewProject((prev) => ({ ...prev, members }))
                    }
                    placeholder="With email of member and press Enter..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsNewProjectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={setProjectToDelete}
            />
          ))}
        </div>

        <EditProjectDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingProject={editingProject}
          onEditProject={handleEditProject}
          setEditingProject={setEditingProject}
        />

        <DeleteProjectDialog
          projectToDelete={projectToDelete}
          onOpenChange={(open) => !open && setProjectToDelete(null)}
          onDelete={handleDeleteProject}
        />
      </div>
    </div>
  );
}
