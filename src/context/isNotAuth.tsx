"use client";

import React, { useEffect } from "react";
import type { ComponentType, FC } from "react";
import { useRouter } from "next/navigation";

export default function isNotAuth<P extends object>(Component: ComponentType<P>): FC<P> {
  const IsNotAuth: FC<P> = (props) => {
    const auth = typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.push("/login");
      }
    }, [auth, router]);

    if (!auth) {
      return <main className="bg-[#FAFAFA] h-full" />;
    }

    return <Component {...(props as P)} />;
  };

  IsNotAuth.displayName = `isNotAuth(${Component.displayName || Component.name || "Component"})`;
  return IsNotAuth;
}
