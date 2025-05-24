"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ROUTES } from "@/constants/routes";
import { getErrorMessage } from "@/helpers/get-error-message";
import { createUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Campo obrigatório" }),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(1, { message: "Campo obrigatório" }),
    confirmPassword: z.string().min(1, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Error will appear under confirmPassword
  });

type SignUpFormValues = z.infer<typeof signupSchema>;

export default function SignUp() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { push } = useRouter();

  const signupMutate = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      form.reset();
      toast.success("Usuário cadastrado com sucesso!");
      push(ROUTES.public.signin);
    },
    onError: (error: unknown) => {
      toast.error("Erro ao cadastrar usuário", {
        description: getErrorMessage(error),
      });
    },
  });

  const submit = async (data: SignUpFormValues) => {
    const { confirmPassword, ...userData } = data;
    signupMutate.mutateAsync(userData);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-center">Cadastre-se</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              <Button type="submit" className="w-full" size="lg">
                Cadastrar
              </Button>

              <Button
                type="button"
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => push(ROUTES.public.signin)}
              >
                Voltar para o Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
