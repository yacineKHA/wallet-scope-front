"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import CustomInput from "@/components/ui/customInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useLogin } from "@/lib/hooks/useLogin";
import { toast } from "sonner";


const LoginPage = () => {
  const {login, isLoginLoading, loginError} = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Connexion réussie");
    } catch (error) {
      toast.error((error as Error).message.toString());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Connexion
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomInput
              label="Adresse email"
              type="email"
              placeholder="nom@mail.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <CustomInput
              label="Mot de passe"
              type="password"
              placeholder="Votre mot de passe"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register("password")}
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary focus:ring-2"
                />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Button asChild variant="link">
              <Link href="/register">Créer un compte</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
