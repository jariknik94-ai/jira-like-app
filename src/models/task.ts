export type TaskStatus = "backlog" | "todo" | "in_progress" | "done";

export interface Task {
  id: string; // AB-1234
  title: string;
  subtitle: string;
  description: string;
  author: string;
  assignee: string;
  time: string;
  status: TaskStatus;
}