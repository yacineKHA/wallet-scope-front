import { z } from "zod";

// Validation pour la connexion
export const loginSchema = z.object({
  email: z
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

// Validation pour l'inscription
export const registerSchema = z.object({
  email: z
    .email("Format d'email invalide"),
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
    ),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
    ),
  confirmPassword: z
    .string()
    .min(1, "La confirmation du mot de passe est requise"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Validation pour l'ajout d'un wallet
export const addWalletSchema = z.object({
  walletName: z.string().min(2, "Nom du wallet requis"),
  walletAddress: z.string().min(26, "Adresse du wallet requise (minimum 26 caractères)"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AddWalletFormData = z.infer<typeof addWalletSchema>;
