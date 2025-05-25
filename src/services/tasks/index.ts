import { api } from "@/config/api";
import { ICreateTask, ITask } from "./types";

export function getAllTasks() {
  return api.get<ITask[]>("/tasks");
}

export function getTaskById(id: number) {
  return api.get<ITask>(`/tasks/${id}`);
}

export function createTask(data: ICreateTask) {
  return api.post("/tasks", data);
}
