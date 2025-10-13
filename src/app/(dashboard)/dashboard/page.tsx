"use client";

import useUser from "@/lib/hooks/useUser";

export default function DashboardPage() {
    const { user, loading, error } = useUser();

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <p>Bienvenue {user.username || user.email}</p>}
        </div>
    );
}