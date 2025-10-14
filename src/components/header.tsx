"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useLogout } from "@/lib/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    toast.info("Déconnexion réussie");
  };

  return (
    <header className="flex justify-between p-10">
      <h1>Wallet Scope</h1>
      <div></div>

      {isAuthenticated ? (
        <div className="flex gap-5">
          <Button asChild>
            <Link href="profile">Home</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Button asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
