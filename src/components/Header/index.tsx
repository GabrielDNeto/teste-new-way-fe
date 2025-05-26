import Link from "next/link";
import { Button } from "../ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/auth";
import { ArrowRightToLineIcon, DoorOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, setUser } = useAuth();

  const isAdmin = user?.isAdmin || false;

  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("@session:access_token");
    setUser(null);
    push(ROUTES.public.signin);
  };

  return (
    <header className="flex h-16 w-full items-center justify-between bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">Teste New Way</h1>

        {isAdmin && (
          <nav>
            <ul className="flex items-center gap-6">
              <li className="text-sm">
                <Link
                  href={ROUTES.private.tasks}
                  className="text-white hover:text-gray-300"
                >
                  Tarefas
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  href={ROUTES.private.users}
                  className="text-white hover:text-gray-300"
                >
                  Usuários
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <Button variant="ghost" onClick={handleLogout}>
          <ArrowRightToLineIcon />
          Sair
        </Button>
      </div>
    </header>
  );
}
