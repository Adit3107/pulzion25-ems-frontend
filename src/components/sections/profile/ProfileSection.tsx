"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export function ProfileSection() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="rounded-lg border p-4 space-y-2">
      <h2 className="text-xl font-semibold">Profile Overview</h2>
      <div className="text-sm">Name: {user.first_name} {user.last_name}</div>
      <div className="text-sm">Email: {user.email}</div>
      <div className="text-sm">Mobile: {user.mobile_number}</div>
      <div className="text-sm">College: {user.college}</div>
      <div className="text-sm">Year: {user.year}</div>
    </section>
  );
}
