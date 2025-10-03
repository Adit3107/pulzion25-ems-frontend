"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import api from "@/api/api";

export type ApiEvent = {
  id: number;
  name: string;
  description: string;
  type: string; // "Technical" | "Non-Technical"
  mode: string; // "Online" | "Offline" | "Online + Offline"
  is_active: boolean;
  price: number;
  link?: string | null;
  tagline?: string | null;
  logo?: string | null;
  rules?: string | null; // may be JSON-encoded
  rounds?: string | null; // may be JSON-encoded
  teams?: string | null;
  notes?: string | null;
  platform?: string | null;
  created_at?: string;
  updated_at?: string;
  offers?: any[];
};

export type EventsByCategory = {
  technical: ApiEvent[];
  nontechnical: ApiEvent[];
};

export type EventContextType = {
  events: EventsByCategory;
  loading: boolean;
  error: string | null;
  loadEvents: () => Promise<void>;
};

const EventContext = createContext<EventContextType | null>(null);

export const EventContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<EventsByCategory>({ technical: [], nontechnical: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/events");
      console.log(res.data);
      const data = res.data as { events: ApiEvent[] } | ApiEvent[];
      const list = Array.isArray(data) ? data : data.events;
      const normalizedList = Array.isArray(list) ? list : [];

      const normalizeType = (t?: string | null) =>
        (t ?? "").toLowerCase().replace(/[^a-z]/g, "");

      const categorized: EventsByCategory = normalizedList.reduce<EventsByCategory>(
        (acc, ev) => {
          const t = normalizeType(ev.type);
          if (t === "Technical") acc.technical.push(ev);
          else if (t === "Non-Technical") acc.nontechnical.push(ev);
          else {
            // Fallback: try to infer by keywords
            if (t.includes("non") && t.includes("technical")) acc.nontechnical.push(ev);
            else if (t.includes("technical")) acc.technical.push(ev);
            else acc.nontechnical.push(ev); // default bucket
          }
          return acc;
        },
        { technical: [], nontechnical: [] }
      );

      setEvents(categorized);
    } catch (e: any) {
      console.error("Failed to load events", e);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ events, loading, error, loadEvents }), [events, loading, error]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents must be used within EventContextProvider");
  return ctx;
};
