"use client";

import Header from '@/components/layout/header';
import { OperativeInterface } from '@/components/operative-interface/OperativeInterface';

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative z-20">
        <Header />
      </div>
      <main className="flex-grow">
        <OperativeInterface />
      </main>
    </div>
  );
}
