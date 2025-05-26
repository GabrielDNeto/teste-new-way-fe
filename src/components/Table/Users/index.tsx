import TablePagination from "@/components/TablePagination";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getErrorMessage } from "@/helpers/get-error-message";
import { getAllUsersPaginated, updateUserRole } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: users, isPlaceholderData } = useQuery({
    queryFn: () => getAllUsersPaginated({ page, items: 10 }),
    queryKey: ["users", page],
    refetchOnWindowFocus: false,
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!", {
        description: "Você pode vê-lo na lista de usuários",
      });
    },
    onError: (err) => {
      toast.success("Erro ao atualizar usuário!", {
        description: getErrorMessage(err),
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Card className="p-6 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Última atualização</TableHead>
            <TableHead className="w-[160px]">Tipo de usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data.data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {dayjs(user.updatedAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="w-[160px]">
                <Select
                  defaultValue={user.isAdmin ? "admin" : "member"}
                  onValueChange={() => updateUserRoleMutation.mutate(user.id)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        totalCount={users?.data.meta.total || 0}
        currentPage={page}
        setPage={setPage}
      />
    </Card>
  );
}
