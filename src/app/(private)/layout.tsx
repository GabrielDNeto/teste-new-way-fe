"use client";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/auth";
import { getUserInfo } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuth();

  const { data: userInfo, isLoading } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["userInfo"],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setUser(userInfo?.data);
  }, [setUser, userInfo]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-4rem)] w-full bg-gray-100">
        {children}
      </main>
    </>
  );
}
