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
import { signIn } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(1, { message: "Campo obrigatório" }),
});

type SignInFormValues = z.infer<typeof signinSchema>;

export default function SignIn() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { push } = useRouter();

  const signinMutate = useMutation({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      if (data) {
        localStorage.setItem("@session:access_token", data.access_token);
        form.reset();
        push(ROUTES.private.tasks);
      }
    },
    onError: (error) => {
      toast.warning("Erro ao fazer login", {
        closeButton: true,
        description: getErrorMessage(error),
      });
    },
  });

  const submit = async (data: SignInFormValues) => {
    signinMutate.mutateAsync(data);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-center">Acesse sua conta</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4 mt-4">
              <Button
                type="submit"
                className="w-full flex items-center gap-4"
                size="lg"
              >
                {signinMutate.isPending && <Loader2 className="animate-spin" />}
                Entrar
              </Button>

              <Button
                type="button"
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => push(ROUTES.public.signup)}
              >
                Criar uma conta
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
