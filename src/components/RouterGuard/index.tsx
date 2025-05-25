"use client";

import { ROUTES } from "@/constants/routes";
import { access } from "fs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function RouterGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { push } = useRouter();

  const isPrivateRoute = useMemo(() => {
    return Object.values(ROUTES.private).some((route) =>
      pathname.includes(route)
    );
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("@session:access_token");

    if (isPrivateRoute && !token) {
      push(ROUTES.public.signin);
    }

    if (
      token &&
      (pathname === ROUTES.public.signin || pathname === ROUTES.public.signup)
    ) {
      push(ROUTES.private.tasks);
    }
  }, [isPrivateRoute, pathname, push]);

  return children;
}
