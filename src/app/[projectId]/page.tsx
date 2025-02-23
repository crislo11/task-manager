"use client";

import { use, useCallback, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./components/TaskCard";
import { TaskDialog } from "./components/TaskDialog";
import { SortSelect } from "./components/SortSelect";
import { FilterSheet } from "./components/FilterSheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import type { Maybe, Task } from "@/types";

type SortOption = "dueDate-asc" | "dueDate-desc" | "none";

type ProjectParams = Promise<{ projectId: string }>;

export default function ProjectBoard({ params }: { params: ProjectParams }) {
  const { projectId } = use(params);

  const {
    loading,
    error,
    todoTasks,
    inProgressTasks,
    doneTasks,
    addTask,
    updateTask,
    deleteTask,
  } = useProjectTasks(projectId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [draggedTask, setDraggedTask] = useState<Maybe<Task>>(null);
  const [editingTask, setEditingTask] = useState<Maybe<Task>>(null);
  const [taskToDelete, setTaskToDelete] = useState<Maybe<Task>>(null);
  const [priorityFilters, setPriorityFilters] = useState<string[]>([]);
  const [taskForm, setTaskForm] = useState<{
    title: string;
    description: string;
    dueDate: Maybe<Date>;
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
  });

  const filteredAndSortedTasks = useCallback(
    (tasks: Task[]) => {
      let filtered = tasks;

      if (priorityFilters.length > 0) {
        filtered = filtered.filter((task) =>
          priorityFilters.includes(task.priority)
        );
      }

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

  const handleDragStart = (task: Maybe<Task>) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (status: Task["status"]) => {
    if (!draggedTask) return;

    const success = await updateTask(draggedTask.id!, {
      status: status,
    });

    if (success) {
      toast.success("Task moved successfully");
    } else {
      toast.error("Failed to move task");
    }

    setDraggedTask(null);
  };

  const handleOpenDialog = (task?: Maybe<Task>) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
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

  const handleSaveTask = async () => {
    if (!taskForm.title.trim()) return;

    if (editingTask) {
      const success = await updateTask(editingTask.id!, {
        ...taskForm,
        dueDate: taskForm.dueDate ? taskForm.dueDate : null,
      });

      if (success) {
        toast.success("Task updated successfully");
      } else {
        toast.error("Failed to update task");
      }
    } else {
      const taskId = await addTask({
        ...taskForm,
        projectId: projectId,
        status: "todo",
        dueDate: taskForm.dueDate ? taskForm.dueDate : null,
      });

      if (taskId) {
        toast.success("Task created successfully");
      } else {
        toast.error("Failed to create task");
      }
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

  const handleOpenDeleteDialog = (task: Maybe<Task>) => {
    setTaskToDelete(task);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    const success = await deleteTask(taskToDelete.id!);

    if (success) {
      toast.success("Task deleted successfully");
    } else {
      toast.error("Failed to delete task");
    }

    setTaskToDelete(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    { id: "todo", title: "To Do", tasks: todoTasks },
    { id: "in-progress", title: "In Progress", tasks: inProgressTasks },
    { id: "done", title: "Done", tasks: doneTasks },
  ];

  return (
    <div className="min-h-screen bg-background py-4 px-8">
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
            onDrop={() => handleDrop(column.id as Task["status"])}
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
