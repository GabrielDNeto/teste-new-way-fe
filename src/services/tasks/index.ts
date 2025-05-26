import { api } from "@/config/api";
import { ICreateTask, ITask, IUpdateTask } from "./types";
import { WithPagination } from "@/types/pagination";

export function getAllTasks() {
  return api.get<ITask[]>("/tasks");
}

export function getAllTasksPaginated({
  page,
  items,
}: {
  page: number;
  items: number;
}) {
  return api.get<WithPagination<ITask>>("/tasks/paginated", {
    params: { current: page, items },
  });
}

export function getTaskById(id: number) {
  return api.get<ITask>(`/tasks/${id}`);
}

export function createTask(data: ICreateTask) {
  return api.post("/tasks", data);
}

export function updateTask(data: IUpdateTask) {
  const { id, ...body } = data;
  return api.put(`/tasks/${id}`, body);
}

export function updateTaskStatus(data: { id: number; status: string }) {
  const { id, ...body } = data;
  return api.patch(`/tasks/${id}`, body);
}

export function deleteTask(id: number) {
  return api.delete<void>(`/tasks/${id}`);
}
