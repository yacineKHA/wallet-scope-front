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
- [📱 Utilisation](#-utilisation)
- [🧪 Comptes de démo](#-comptes-de-démonstration)
- [🔐 Sécurité](#-sécurité)

## 🎯 À propos

**Wallet Scope** est une application web moderne de tracking de portefeuilles blockchain. Elle permet de visualiser et suivre plusieurs wallets crypto simultanément avec une interface utilisateur intuitive, un système d'authentification robuste et une architecture scalable pour gérer de multiples adresses blockchain.

### 🎨 Captures d'écran

*Dashboard de tracking multi-wallets avec interface moderne et thème adaptatif*

### 🏆 Points forts techniques

- **Architecture Full-Stack** : Frontend Next.js 15 avec backend Express.js
- **Sécurité avancée** : JWT, sessions sécurisées, rate limiting, helmet
- **UI/UX moderne** : Composants Radix UI, Tailwind CSS 4, thème adaptatif
- **Base de données** : Prisma ORM avec SQLite pour stocker les wallets et données utilisateur
- **Multi-blockchain** : Support pour plusieurs réseaux blockchain
- **Validation** : Zod pour la validation des adresses et données
- **Logging** : Winston avec rotation des logs pour le monitoring

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- [x] Inscription et connexion sécurisées
- [x] Gestion des sessions avec refresh tokens
- [x] Hachage des mots de passe avec bcrypt
- [x] Protection CSRF et rate limiting
- [x] Validation des formulaires avec Zod

### 💰 Tracking de Portefeuilles
- [x] Ajout et suivi de multiples wallets
- [x] Visualisation des balances en temps réel
- [x] Historique des transactions
- [x] Support multi-blockchain (Bitcoin, Ethereum, etc.)
- [x] Dashboard avec métriques et graphiques

### 💼 Interface utilisateur
- [x] Design responsive
- [x] Composants UI réutilisables (Radix UI)
- [x] Animations fluides avec Tailwind CSS
- [x] Formulaires avec validation en temps réel

### 🔧 Architecture technique
- [x] API RESTful sécurisée
- [x] Middleware de sécurité (Helmet, CORS)
- [x] Logging structuré avec Winston
- [x] Base de données relationnelle avec Prisma
- [x] TypeScript pour la sécurité des types

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

### DevOps & Outils
- **Build** : Turbopack (Next.js)
- **Linting** : ESLint 9
- **Package Manager** : npm
- **Database Migrations** : Prisma Migrate

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git


### 2. Installation du Backend
```bash
cd wallet-scope-back
npm install

# Configuration de la base de données
cp .env

# Générer le client Prisma et migrer la DB
npx prisma generate
npx prisma migrate dev

# Démarrer le serveur de développement
npm run dev
```

### 3. Installation du Frontend
```bash
cd ../wallet-scope-front
npm install

# Démarrer l'application Next.js
npm run dev
```

### 4. Accès à l'application
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3005

## 📱 Utilisation

### Démarrage
1. Accédez à l'application
2. Créez un compte via la page d'inscription
3. Connectez-vous avec vos identifiants
4. Ajoutez vos adresses de wallets blockchain
5. Visualisez vos portefeuilles et suivez vos balances en temps réel


#### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre-secret-jwt-super-securise"
JWT_REFRESH_SECRET="votre-refresh-secret"
NODE_ENV="development"
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3005"
```

## 🧪 Comptes de démonstration

Pour tester rapidement, vous pouvez utiliser ces comptes pré-configurés :

### Utilisateur 1 -
- **Email :** `bob@demo.com`
- **Mot de passe :** `demo12345`

## 🔐 Sécurité

Cette application implémente plusieurs couches de sécurité :

- **Authentification JWT** avec refresh tokens
- **Hachage des mots de passe** avec bcrypt (salt rounds: 12)
- **Rate limiting** pour prévenir les attaques par force brute
- **Headers de sécurité** avec Helmet.js
- **CORS** configuré pour les domaines autorisés
- **Sessions sécurisées** avec gestion des appareils
- **Protection des données sensibles** des portefeuilles

## 📁 Structure du projet

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