"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import isNotAuth from "@/context/isNotAuth";

function ProfilePage() {
  const { user } = useAuth();

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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default isNotAuth(ProfilePage);
