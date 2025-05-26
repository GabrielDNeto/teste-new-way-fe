"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import CreateOrEditTaskModal from "@/components/Modal/Tasks/CreateOrEditTask";
import TasksTable from "@/components/Table/Tasks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksPage() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { push } = useRouter();
  const searchParams = useSearchParams();

  const handleCloseDialog = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    push(`?${params.toString()}`);
    setDialogIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      setDialogIsOpen(true);
    } else {
      setDialogIsOpen(false);
    }
  }, [searchParams]);

  return (
    <>
      <div className="container h-full mx-auto py-8 flex flex-col gap-8">
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tarefas</h1>
            <p className="text-gray-500 mb-4">
              Gerencie tarefas de forma simples e rápida.
            </p>
          </div>

          <Button onClick={() => setDialogIsOpen(true)}>
            <Plus />
            Nova Tarefa
          </Button>
        </div>

        <TasksTable />
      </div>

      {dialogIsOpen && (
        <CreateOrEditTaskModal
          open={dialogIsOpen}
          onOpenChange={handleCloseDialog}
        />
      )}
    </>
  );
}
