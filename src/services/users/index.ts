import { api } from "@/config/api";
import { WithPagination } from "@/types/pagination";

export function getAllUsersPaginated({
  page,
  items,
}: {
  page: number;
  items: number;
}) {
  return api.get<WithPagination<IUser>>(`/users/paginated`, {
    params: { current: page, items },
  });
}

export function createUser(data: ICreateUser) {
  return api.post("/users", data);
}

export function getUserInfo() {
  return api.get("/users/me");
}

export function updateUserRole(id: number) {
  return api.get(`/users/change-role/${id}`);
}
