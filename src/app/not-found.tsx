// app/not-found.tsx
import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(ROUTES.private.tasks);
}
