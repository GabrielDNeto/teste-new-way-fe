export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: string;
  user: {
    name: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTask {
  title: string;
  description?: string;
  status: string;
}

export interface IUpdateTask {
  id: number;
  title: string;
  description?: string;
  status: string;
}
