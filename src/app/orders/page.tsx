"use client";

import React, { useEffect, useState } from "react";
import api from "@/api/api";
import isNotAuth from "@/context/isNotAuth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EventCard } from "@/components/ui/event-card";
import type { ApiEvent } from "@/context/EventContext";

export type Transaction = {
  id: string;
  transaction_id: string;
  amount: number;
  events: string[];
  status: string;
};

const Orders: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      const response = await api.get("/user_events");
      const evs = Array.isArray(response.data?.events)
        ? (response.data.events as ApiEvent[])
        : ([] as ApiEvent[]);
      setEvents(evs);
    } catch (error) {
      console.error("Failed to fetch user events", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyOrders = async () => {
    try {
      const response = await api.get("/transaction");
      const txs = Array.isArray(response.data?.transactions)
        ? (response.data.transactions as Transaction[])
        : ([] as Transaction[]);
      setTransactions(txs);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load both in parallel
    fetchMyEvents();
    fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-muted-foreground font-code">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-center text-3xl md:text-5xl font-headline text-secondary tracking-wide mb-8">My Orders</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <Card key={tx.id} className="bg-card/80 border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="font-headline text-xl">TXN: {tx.transaction_id}</div>
                  <Badge variant="outline" className="font-code">
                    {tx.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-code text-muted-foreground">Amount</div>
                <div className="text-lg font-bold">₹ {Number(tx.amount) || 0}</div>

                <Separator className="my-4 bg-primary/20" />

                <div className="text-sm font-code text-muted-foreground mb-2">Events</div>
                {Array.isArray(tx.events) && tx.events.length > 0 ? (
                  <ul className="list-disc list-inside text-foreground/90">
                    {tx.events.map((e, i) => (
                      <li key={`${tx.id}-ev-${i}`}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground font-code">—</div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center text-muted-foreground font-code">
            No orders yet
          </div>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-center text-2xl md:text-4xl font-headline text-secondary mb-6">My Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} isActive={!!event.is_active} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground font-code">
              No events accepted yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default isNotAuth(Orders);
