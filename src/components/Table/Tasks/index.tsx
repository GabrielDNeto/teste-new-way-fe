import TablePagination from "@/components/TablePagination";
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
import { useAuth } from "@/contexts/auth";
import { getErrorMessage } from "@/helpers/get-error-message";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllTasksPaginated,
  updateTask,
  updateTaskStatus,
} from "@/services/tasks";
import { ITask } from "@/services/tasks/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FolderSearch, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TasksTable() {
  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const isAdmin = user?.isAdmin || false;

  const queryClient = useQueryClient();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const { data: tasks } = useQuery({
    queryFn: () => getAllTasksPaginated({ page, items: 10 }),
    queryKey: ["tasks", page],
    refetchOnWindowFocus: false,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Tarefa excluída com sucesso!", {
        description: "Agora você não a verá mais na lista de tarefas",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error("Erro ao excluir tarefa!", {
        description: getErrorMessage(err),
      });
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa editada com sucesso!", {
        description: "Agora você pode vê-la na lista de tarefas.",
      });
    },
    onError: (err) => {
      toast.error("Erro ao editar tarefa!", {
        description: getErrorMessage(err),
      });
    },
  });

  const handleChangeTaskStatus = (id: number, status: string) =>
    status === "finished" ? (
      <DropdownMenuItem
        onClick={() =>
          updateTaskStatusMutation.mutate({ id, status: "pending" })
        }
      >
        Renovar
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem
        onClick={() =>
          updateTaskStatusMutation.mutate({ id, status: "finished" })
        }
      >
        Concluir
      </DropdownMenuItem>
    );

  const handleTaskStatusBadge = (status: string) =>
    status === "finished" ? (
      <Badge className="bg-lime-500 hover:bg-lime-600">Concluída</Badge>
    ) : (
      <Badge className="bg-slate-400">Pendente</Badge>
    );

  const handleEditTask = (taskId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", String(taskId));
    push(`?${params.toString()}`);
  };

  return (
    <Card className="p-6 h-full">
      {tasks?.data.data.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              {isAdmin && <TableHead>Usuário</TableHead>}
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última atualização</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.data.data?.map((task) => (
              <TableRow key={task.id}>
                {isAdmin && (
                  <TableCell className="font-semibold">
                    {task.user.name}
                  </TableCell>
                )}
                <TableCell>{task.title}</TableCell>
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
                      {handleChangeTaskStatus(task.id, task.status)}
                      <DropdownMenuItem onClick={() => handleEditTask(task.id)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteTaskMutation.mutate(task.id)}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <FolderSearch className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500">
            Nenhuma tarefa encontrada, crie novas tarefas para visualizá-las
            aqui.
          </p>
        </div>
      )}

      {(tasks?.data.meta.total || 0) > 10 && (
        <TablePagination
          totalCount={tasks?.data.meta.total || 0}
          currentPage={page}
          setPage={setPage}
        />
      )}
    </Card>
  );
}
