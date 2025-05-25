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

import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CreateOrEditTaskModal from "@/components/Modal/Tasks/CreateOrEditTask";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/services/tasks";

// const tasks = [
//   {
//     id: 1,
//     title: "Tarefa 1",
//     description: "Descrição da tarefa 1",
//     status: "pending",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     title: "Tarefa 2",
//     description: "Descrição da tarefa 2",
//     status: "pending",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 3,
//     title: "Tarefa 3",
//     description: "Descrição da tarefa 3",
//     status: "finished",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 4,
//     title: "Tarefa 4",
//     description: "Descrição da tarefa 4",
//     status: "pending",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

export default function Tasks() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const { data: tasks } = useQuery({
    queryFn: getAllTasks,
    queryKey: ["tasks"],
    refetchOnWindowFocus: false,
  });

  const handleTaskStatusBadge = (status: string) =>
    status === "finished" ? (
      <Badge className="bg-lime-500 hover:bg-lime-600">Concluída</Badge>
    ) : (
      <Badge className="bg-slate-400">Pendente</Badge>
    );

  const handleChangeTaskStatus = (status: string) =>
    status === "finished" ? (
      <DropdownMenuItem onClick={() => console.log("volta pra pending")}>
        Renovar
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem onClick={() => console.log("conclui")}>
        Concluir
      </DropdownMenuItem>
    );

  const handleEditTask = (taskId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", String(taskId));
    push(`?${params.toString()}`);
  };

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
            <p className="text-gray-500">
              Gerencie suas tarefas de forma simples e rápida.
            </p>
          </div>

          <Button onClick={() => setDialogIsOpen(true)}>
            <Plus />
            Nova Tarefa
          </Button>
        </div>

        <Card className="p-6 h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última atualização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks?.data.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{handleTaskStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    {dayjs(task.updatedAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {handleChangeTaskStatus(task.status)}
                        <DropdownMenuItem
                          onClick={() => handleEditTask(task.id)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <CreateOrEditTaskModal
        open={dialogIsOpen}
        onOpenChange={handleCloseDialog}
      />
    </>
  );
}
