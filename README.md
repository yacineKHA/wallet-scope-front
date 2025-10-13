# 💰 Wallet Scope (projet en cours)

> **Application de tracking de portefeuilles blockchain** - Une solution full-stack sécurisée pour visualiser et suivre plusieurs wallets crypto en temps réel.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-green?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

## 📋 Table des matières

- [🎯 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [🚀 Installation](#-installation)
- [🧪 Comptes de démo](#-comptes-de-démonstration)
- [🔐 Sécurité](#-sécurité)

## 🎯 À propos

**Wallet Scope** est une application web de tracking de portefeuilles blockchain. Elle permet de visualiser et suivre plusieurs wallets crypto simultanément avec une interface utilisateur simple, et un système d'authentification.


*Dashboard de tracking multi-wallets*

- **Architecture Full-Stack** : Frontend Next.js 15 avec backend Express.js
- **Sécurité avancée** : JWT, sessions sécurisées, rate limiting, helmet
- **UI/UX moderne** : Composants Radix UI, Tailwind CSS 4, thème adaptatif
- **Base de données** : Prisma ORM avec SQLite pour stocker les wallets et données utilisateur
- **Multi-blockchain** : Support pour plusieurs réseaux blockchain
- **Validation** : Zod pour la validation données
- **Logging** : Winston

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- [x] Inscription et connexion sécurisées
- [x] Gestion des sessions avec refresh tokens
- [x] Hachage des mots de passe avec bcrypt
- [x] Protection CSRF et rate limiting
- [x] Validation des formulaires avec Zod

### 💼 Interface utilisateur
- [x] Radix UI
- [x] Tailwind CSS

### 🔧 Architecture technique
- [x] Middleware de sécurité (Helmet, CORS)
- [x] Logging structuré avec Winston
- [x] Base de données relationnelle avec Prisma

## 🛠️ Technologies utilisées

### Frontend
- **Framework** : Next.js 15.5.3 avec App Router
- **Langage** : TypeScript 5.x
- **Styling** : Tailwind CSS 4.x
- **UI Components** : Radix UI, Lucide React
- **Forms** : React Hook Form + Zod validation
- **HTTP Client** : Axios
- **Thèmes** : next-themes

### Backend
- **Runtime** : Node.js avec Express.js 5.1.0
- **Langage** : TypeScript 5.x
- **Base de données** : SQLite avec Prisma ORM 6.16.2
- **Authentification** : JWT + bcrypt
- **Sécurité** : Helmet, CORS, express-rate-limit
- **Logging** : Winston avec rotation quotidienne
- **Validation** : Zod schemas

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### 4. Accès à l'application
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3005


## 🔐 Sécurité backend

- **Authentification JWT** avec refresh tokens
- **Hachage des mots de passe** avec bcrypt (salt rounds: 12)
- **Rate limiting** pour prévenir les attaques par force brute
- **Headers de sécurité** avec Helmet.js
- **CORS** configuré pour les domaines autorisés
- **Sessions sécurisées** avec gestion des appareils


## 📁 Structure du projet complet

```
wallet-scope/
├── wallet-scope-front/          # Application Next.js
│   ├── src/
│   │   ├── app/                 # App Router (Next.js 13+)
│   │   │   ├── (auth)/         # Routes d'authentification
│   │   │   └── (dashboard)/    # Routes du dashboard
│   │   ├── components/         # Composants réutilisables
│   │   │   └── ui/            # Composants UI de base
│   │   └── lib/               # Utilitaires et API
│   └── public/                # Assets statiques
│
└── wallet-scope-back/          # API Express.js
    ├── src/
    │   ├── controllers/       # Logique métier
    │   ├── middlewares/       # Middlewares Express
    │   ├── models/           # Modèles de données
    │   ├── routes/           # Définition des routes
    │   ├── services/         # Services (JWT, etc.)
    │   └── types/            # Types TypeScript
    ├── prisma/              # Schéma et migrations DB
    └── logs/                # Logs de l'application
```