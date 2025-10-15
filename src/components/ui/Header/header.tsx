"use client";

import Link from "next/link";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useLogout } from "@/lib/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { getInitials } from "@/utils/utils";
import { useState } from "react";
import { UserDropdown } from "./user-dropdown";
import { DropdownMenu, DropdownMenuTrigger } from "../dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    toast.info("Déconnexion réussie");
  };

  return (
    <header className="flex justify-between items-center p-10">
      <Link href="/" className="text-2xl font-bold">
        Wallet Scope
      </Link>

      {isAuthenticated ? (
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <AvatarFallback className="text-white font-semibold">
                  {getInitials(user?.username || user?.email)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <UserDropdown />
          </DropdownMenu>
          

          <div className="hidden md:block text-sm">
            <p className="font-medium">{user?.username || user?.email}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button asChild variant="ghost">
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{`S'inscrire`}</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
