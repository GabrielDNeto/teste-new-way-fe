import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/helpers/get-error-message";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "@/services/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ICreateOrEditTaskModalProps {
  open: boolean;
  onOpenChange: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string(),
  status: z.string(),
});

type CreateOrEditTaskFormValues = z.infer<typeof formSchema>;

export default function CreateOrEditTaskModal({
  open,
  onOpenChange,
}: ICreateOrEditTaskModalProps) {
  const params = useSearchParams();
  const taskId = params.get("id");
  const queryClient = useQueryClient();

  const { data: taskById, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => {
      if (!taskId) return null;
      return getTaskById(Number(taskId));
    },
    enabled: !!taskId,
    refetchOnWindowFocus: false,
  });

  const form = useForm<CreateOrEditTaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: taskById?.data.title || "",
      description: taskById?.data.description || "",
      status: taskById?.data.status || "pending",
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa criada com sucesso!", {
        description: "Agora você pode vê-la na lista de tarefas.",
      });
    },
    onError: (err) => {
      toast.error("Erro ao criar tarefa!", {
        description: getErrorMessage(err),
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
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

  const handleOpenChange = () => {
    form.reset();
    onOpenChange();
  };

  const submit = (data: CreateOrEditTaskFormValues) => {
    if (!taskId) {
      createTaskMutation.mutate(data);
    } else {
      updateTaskMutation.mutate({ id: Number(taskId), ...data });
    }

    handleOpenChange();
  };

  useEffect(() => {
    if (taskById?.data) {
      form.reset({
        title: taskById.data.title || "",
        description: taskById.data.description || "",
        status: taskById.data.status || "pending",
      });
    } else if (!taskId && open) {
      form.reset({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [taskById, form, taskId, open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{taskId ? "Editar tarefa" : "Criar tarefa"}</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>

        {taskId && isLoading ? (
          <div>
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da tarefa</FormLabel>
                    <FormControl>
                      <Input placeholder="Comprar pão" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Comprar pães bem fresquinhos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="finished">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isDirty &&
                    (createTaskMutation.isPending ||
                      updateTaskMutation.isPending)
                  }
                  className="flex items-center gap-4"
                >
                  {(createTaskMutation.isPending ||
                    updateTaskMutation.isPending) && (
                    <Loader2 className="animate-spin" />
                  )}
                  {!taskId ? "Criar tarefa" : "Salvar tarefa"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
