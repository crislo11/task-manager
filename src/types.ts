export interface Project {
  id?: string;
  title: string;
  description?: string | null;
  members?: number;
  tasks?: number;
  lastUpdated?: string;
}
