"use client";


import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import isNotAuth from "@/context/isNotAuth";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const { user, setUser } = useAuth();
  console.log(user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getHouseName = (id?: number | null) => {
    switch (id) {
      case 1: return 'Delta';
      case 2: return 'Charlie';
      case 3: return 'Echo';
      case 4: return 'Bravo';
      default: return 'Unknown';
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post("/user/signout");
    } catch (e) {
      // ignore error; proceed to clear state
      console.error(e);
    } finally {
      // Clear auth locally regardless
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        {user ? (
          <div className="rounded-lg border p-4 space-y-2">
            <div className="text-lg font-semibold">{user.first_name} {user.last_name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="text-sm">Mobile: {user.mobile_number}</div>
            <div className="text-sm">College: {user.college}</div>
            <div className="text-sm">Year: {user.year}</div>
            {user.house ? (
              <div className="text-sm">House: {getHouseName(user.house.fk_house)} (ID: {user.house.fk_house})</div>
            ) : (
              <div className="text-sm">House: Not assigned</div>
            )}
            <div className="pt-2">
              <Button onClick={handleLogout} className="bg-primary text-primary-foreground" disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default isNotAuth(ProfilePage);
