interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
