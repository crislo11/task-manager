import { Maybe } from "@/types";
import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Maybe<Timestamp>) => {
  return date?.toDate().toLocaleDateString();
};

export const formatDateFromNow = (date: Maybe<Timestamp>) => {
  return date?.toDate().toLocaleDateString();
};
