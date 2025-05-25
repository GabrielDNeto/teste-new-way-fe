"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Plus } from "lucide-react";

import CreateOrEditTaskModal from "@/components/Modal/Tasks/CreateOrEditTask";
import { getErrorMessage } from "@/helpers/get-error-message";
import { deleteTask, getAllTasks, updateTaskStatus } from "@/services/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import TasksTable from "@/components/Table/Tasks";

const tabEnum = z.enum(["my-tasks", "all-tasks"]);

type TabType = z.infer<typeof tabEnum>;

export default function Tasks() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [tab, setTap] = useState<TabType>("my-tasks");

  const { push } = useRouter();
  const searchParams = useSearchParams();

  const { data: tasks } = useQuery({
    queryFn: getAllTasks,
    queryKey: ["tasks"],
    refetchOnWindowFocus: false,
  });

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

        <TasksTable tasks={tasks?.data || []} />
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
