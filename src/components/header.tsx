import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const isAuth = false;

  return (
    <header className="flex justify-between p-10">
      <h1>Wallet Scope</h1>
      <div></div>

      {isAuth ? (
        <div className="flex gap-5">
          <Button asChild>
            <Link href="profile">Home</Link>
          </Button>
          <Button asChild>
            <Link href="profile">Déconnexion</Link>
          </Button>
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
