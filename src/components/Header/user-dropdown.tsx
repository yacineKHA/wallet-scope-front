import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { JSX } from "react";
import useLogout from "@/lib/hooks/useLogout";

export function UserDropdown(): JSX.Element {
  const { logout } = useLogout();
  const { clearUser } = useAuthStore();

  const handleLogout = (): void => {
    logout();
    clearUser();
    toast.success("Déconnexion réussie");
  };

  return (
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/profile">Profil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link className="w-full" href="/dashboard/wallets">Mes wallets</Link>
          </DropdownMenuItem>
        <DropdownMenuItem>
            <Link className="w-full" href="/dashboard/settings">Paramètres</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
        {" "}
        <LogOut /> Se déconnecter
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
