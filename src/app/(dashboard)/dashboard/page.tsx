"use client";

import useUser from "@/lib/hooks/useUser";

export default function DashboardPage() {
    const { user, isLoading, isAuthenticated, error } = useUser();

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <p>Bienvenue {user.username || user.email}</p>}
        </div>
    );
}