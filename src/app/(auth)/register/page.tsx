"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CustomInput from "@/components/ui/customInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { useRegister } from "@/lib/hooks/useRegister";
import { toast } from "sonner";

const SignupPage = () => {
  const { signup, isSignupLoading, signupError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await signup(data.email, data.username, data.password);
      console.log("response: ", response)
      toast.success(`Inscription réussie, Vous pouvez vous connecter`);
    } catch (error) {
      toast.error((error as Error).message.toString());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entrez vos identifiants pour créer un compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomInput
              label="Adresse email"
              type="email"
              placeholder="nom@exemple.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <CustomInput
              label="Username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              icon={<User className="h-4 w-4" />}
              error={errors.username?.message}
              {...register("username")}
            />

            <CustomInput
              label="Mot de passe"
              type="password"
              placeholder="Votre mot de passe"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register("password")}
            />

            <CustomInput
              label="Confirmation du mot de passe"
              type="password"
              placeholder="Confirmer votre mot de passe"
              icon={<Lock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              className="w-full h-11 mt-5"
              disabled={isSignupLoading}
            >
              {isSignupLoading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Button asChild variant="link">
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
