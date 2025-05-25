import { api } from "@/config/api";

export function createUser(data: ICreateUser) {
  return api.post("/users", data);
}

export function getUserInfo() {
  return api.get("/users/me");
}
