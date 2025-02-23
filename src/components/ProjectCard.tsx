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
import type { Maybe, Project } from "@/types";
import { formatDate } from "@/utils/date";

interface ProjectCardProps {
  project: Maybe<Project>;
  onEdit: (project: Maybe<Project>) => void;
  onDelete: (project: Maybe<Project>) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card key={project?.id} className="p-4">
      <div className="flex items-start justify-between">
        <div className="grid gap-1">
          <Link
            href={`/${project?.id}`}
            className="font-semibold hover:underline"
          >
            {project?.title}
          </Link>
          <p className="text-sm text-muted-foreground">
            {project?.description}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                onEdit(project);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(project)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users2 className="h-4 w-4" />
          {project?.members?.length} members
        </div>
        <div className="flex items-center gap-1">
          <Layout className="h-4 w-4" />
          Tasks
        </div>
        <div>Updated {formatDate(project?.updateAt)}</div>
      </div>
    </Card>
  );
}
