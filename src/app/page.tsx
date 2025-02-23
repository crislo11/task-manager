"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProjectCard } from "@/components/ProjectCard";
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
import { Project } from "@/types";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Website Redesign",
      description:
        "Modernizing the user interface and improving the shopping experience",
      members: 5,
      tasks: 12,
      lastUpdated: "2024-02-22",
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Creating a new mobile application for our service",
      members: 4,
      tasks: 8,
      lastUpdated: "2024-02-21",
    },
    {
      id: "3",
      title: "Marketing Campaign",
      description: "Q1 2024 digital marketing campaign planning and execution",
      members: 3,
      tasks: 15,
      lastUpdated: "2024-02-20",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;

    const project: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: newProject.title,
      description: newProject.description,
      members: 1,
      tasks: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setProjects([project, ...projects]);
    setNewProject({ title: "", description: "" });
    setIsNewProjectDialogOpen(false);
    toast.success("Project created successfully");
  };

  const handleEditProject = () => {
    if (!editingProject || !editingProject.title.trim()) return;

    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id
        ? {
            ...project,
            title: editingProject.title,
            description: editingProject.description,
          }
        : project
    );

    setProjects(updatedProjects);
    setIsEditDialogOpen(false);
    setEditingProject(null);
    toast.success("Project updated successfully");
  };

  const handleDeleteProject = () => {
    if (!projectToDelete) return;

    const updatedProjects = projects.filter(
      (project) => project.id !== projectToDelete.id
    );
    setProjects(updatedProjects);
    setProjectToDelete(null);
    toast.success("Project deleted successfully");
  };

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

          {/* <NewProjectDialog
            open={isNewProjectDialogOpen}
            onOpenChange={setIsNewProjectDialogOpen}
            newProject={newProject}
            setNewProject={setNewProject}
            handleAddProject={handleAddProject}
          /> */}
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(project) => {
                setEditingProject(project);
                setIsEditDialogOpen(true);
              }}
              onDelete={(project) => setProjectToDelete(project)}
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
