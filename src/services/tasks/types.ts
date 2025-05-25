export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTask {
  title: string;
  description?: string;
  status: string;
}
