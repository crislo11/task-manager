import { useState, useEffect } from "react";
import {
  collection,
  FirestoreError,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Task } from "@/types";

export const useProjectTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(results);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  const addTask = async (data: Omit<Task, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...data,
        createAt: serverTimestamp(),
        updateAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      setError(err as FirestoreError);
      return null;
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        ...data,
        updateAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      setError(err as FirestoreError);
      return false;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      return true;
    } catch (err) {
      setError(err as FirestoreError);
      return false;
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    todoTasks: getTasksByStatus('todo'),
    inProgressTasks: getTasksByStatus('in-progress'),
    doneTasks: getTasksByStatus('done'),
  };
}; 