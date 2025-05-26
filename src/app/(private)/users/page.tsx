"use client";

import UsersTable from "@/components/Table/Users";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  return (
    <div className="container h-full mx-auto py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-gray-500 mb-4">
          Gerencie os usuários da plataforma.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
