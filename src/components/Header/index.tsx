import Link from "next/link";
import { Button } from "../ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/auth";

export default function Header() {
  const { user } = useAuth();

  const isAdmin = user?.isAdmin || false;

  return (
    <header className="flex h-16 w-full items-center justify-between bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">Teste New Way</h1>

        {isAdmin && (
          <nav>
            <ul>
              <li className="text-sm">
                <Link
                  href={ROUTES.private.tasks}
                  className="text-white hover:text-gray-300"
                >
                  Tarefas
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <Button>Sair</Button>
      </div>
    </header>
  );
}
