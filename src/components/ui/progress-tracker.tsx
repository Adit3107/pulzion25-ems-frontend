"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Target, Shield } from "lucide-react";

interface ProgressTrackerProps {
  totalEvents: number;
  completedEvents: number;
  activeOperatives: number;
  totalOperatives: number;
  systemIntegrity: number;
}

export function ProgressTracker({
  totalEvents,
  completedEvents,
  activeOperatives,
  totalOperatives,
  systemIntegrity,
}: ProgressTrackerProps) {
  return (
    <Card className="bg-background/70 backdrop-blur-md border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary tracking-widest">[ GLOBAL STATUS ]</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 font-code">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2"><Target /> Mission Progress</span>
              <span className="text-secondary font-bold">{completedEvents} / {totalEvents}</span>
            </div>
            <Progress value={(completedEvents / totalEvents) * 100} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2"><Users /> Active Operatives</span>
              <span className="text-secondary font-bold">{activeOperatives} / {totalOperatives}</span>
            </div>
            <Progress value={(activeOperatives / totalOperatives) * 100} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2"><Shield /> System Integrity</span>
              <span className="text-destructive font-bold">{systemIntegrity}%</span>
            </div>
            <Progress value={systemIntegrity} className="[&>*]:bg-destructive" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
