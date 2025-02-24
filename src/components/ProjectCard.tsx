"use client";

import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Layout, MoreVertical, Pencil, Trash, Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { Maybe, Project } from "@/types";
import { formatDate } from "@/utils/date";

interface ProjectCardProps {
  project: Maybe<Project>;
  onEdit: (project: Maybe<Project>) => void;
  onDelete: (project: Maybe<Project>) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  if (!project) return null;

  return (
    <TooltipProvider>
      <Card
        key={project.id}
        className="p-4"
        aria-label={`Project: ${project.title}`}
      >
        <div className="flex items-start justify-between">
          <div className="grid gap-1">
            <Link
              href={`/${project.id}`}
              className="font-semibold hover:underline"
              aria-label={`View project: ${project.title}`}
            >
              {project.title}
            </Link>
            <p
              className="text-sm text-muted-foreground"
              aria-label="Project description"
            >
              {project.description}
            </p>
          </div>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>Project actions</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(project)}
                aria-label="Edit project"
              >
                <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(project)}
                aria-label="Delete project"
              >
                <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div
            className="flex items-center gap-1"
            aria-label="Number of members"
          >
            <Users2 className="h-4 w-4" aria-hidden="true" />
            {project.members?.length} members
          </div>
          <div className="flex items-center gap-1" aria-label="Tasks">
            <Layout className="h-4 w-4" aria-hidden="true" />
            Tasks
          </div>
          <div aria-label={`Last updated: ${formatDate(project.updateAt)}`}>
            Updated {formatDate(project.updateAt)}
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
