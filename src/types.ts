import { Timestamp } from "firebase/firestore";

export type Maybe<T> = T | null | undefined;

export interface Project {
  id?: string;
  ownerId?: string;
  description?: string | null;
  members: string[];
  title: string;
  createAt?: Maybe<Timestamp>;
  updateAt?: Maybe<Timestamp>;
}
