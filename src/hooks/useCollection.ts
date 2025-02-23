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
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const useCollection = <T extends object>(collectionName: string) => {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const colRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (T & { id: string })[];
        setData(results);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [collectionName]);

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch (err) {
      setError(err as FirestoreError);
      return false;
    }
  };

  const addItem = async (data: Omit<T, "id">) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
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

  const updateItem = async (id: string, data: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updateAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      setError(err as FirestoreError);
      return false;
    }
  };

  return { data, loading, error, deleteItem, addItem, updateItem };
};
