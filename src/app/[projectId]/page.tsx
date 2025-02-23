"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./components/TaskCard";
import { TaskDialog } from "./components/TaskDialog";
import { SortSelect } from "./components/SortSelect";
import { FilterSheet } from "./components/FilterSheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

type SortOption = "dueDate-asc" | "dueDate-desc" | "none";

export default function ProjectBoard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [priorityFilters, setPriorityFilters] = useState<string[]>([]);
  const [taskForm, setTaskForm] = useState<{
    title: string;
    description: string;
    dueDate: Date | null;
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
  });
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Research competitors",
          description: "Look into similar products and analyze their features",
          dueDate: null,
          priority: "low",
        },
        {
          id: "2",
          title: "Design system",
          description: "Create a consistent design system for the application",
          dueDate: null,
          priority: "medium",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "3",
          title: "User authentication",
          description: "Implement login and registration functionality",
          dueDate: null,
          priority: "high",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "4",
          title: "Project setup",
          description:
            "Initialize repository and set up development environment",
          dueDate: null,
          priority: "low",
        },
      ],
    },
  ]);

  const filteredAndSortedTasks = useCallback(
    (tasks: Task[]) => {
      let filtered = tasks;

      // Apply priority filters
      if (priorityFilters.length > 0) {
        filtered = filtered.filter((task) =>
          priorityFilters.includes(task.priority)
        );
      }

      // Apply sorting
      if (sortBy !== "none") {
        filtered = [...filtered].sort((a, b) => {
          if (!a.dueDate || !b.dueDate) return 0;
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return sortBy === "dueDate-asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });
      }

      return filtered;
    },
    [priorityFilters, sortBy]
  );

  const handleTaskFormChange = (
    field: keyof typeof taskForm,
    value: string | Date | null
  ) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (!draggedTask) return;

    const updatedColumns = columns.map((column) => {
      // Remove the task from its original column
      if (column.tasks.find((task) => task.id === draggedTask.id)) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
        };
      }
      // Add the task to the new column
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, draggedTask],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
    setDraggedTask(null);
  };

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
      });
    } else {
      setEditingTask(null);
      setTaskForm({
        title: "",
        description: "",
        dueDate: null,
        priority: "low",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) return;

    if (editingTask) {
      // Update existing task
      const updatedColumns = columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskForm } : task
        ),
      }));
      setColumns(updatedColumns);
      toast.success("Task updated successfully");
    } else {
      // Create new task
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        ...taskForm,
      };

      const updatedColumns = columns.map((column) => {
        if (column.id === "todo") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });
      setColumns(updatedColumns);
      toast.success("Task created successfully");
    }

    setIsDialogOpen(false);
    setEditingTask(null);
    setTaskForm({
      title: "",
      description: "",
      dueDate: null,
      priority: "low",
    });
  };

  const handleOpenDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    const updatedColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskToDelete.id),
    }));
    setColumns(updatedColumns);
    toast.success("Task deleted successfully");
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Project Board</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <FilterSheet
            priorityFilters={priorityFilters}
            setPriorityFilters={setPriorityFilters}
          />
          <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        taskForm={taskForm}
        onTaskFormChange={handleTaskFormChange}
        onSave={handleSaveTask}
        isEditing={!!editingTask}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className="rounded-lg border bg-card p-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">{column.title}</h2>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                {filteredAndSortedTasks(column.tasks).length}
              </span>
            </div>
            <div className="space-y-4">
              {filteredAndSortedTasks(column.tasks).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={handleDragStart}
                  onEdit={handleOpenDialog}
                  onDelete={handleOpenDeleteDialog}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <DeleteTaskDialog
        taskToDelete={taskToDelete}
        onOpenChange={(open) => !open && setTaskToDelete(null)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
