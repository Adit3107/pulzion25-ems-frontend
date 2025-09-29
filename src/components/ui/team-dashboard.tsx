"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Zap, Target } from "lucide-react";

type TeamName = 'CHARLIE' | 'DELTA' | 'ECHO' | 'BRAVO';

interface TeamDashboardProps {
  userTeam: TeamName;
}

const teamData = {
  CHARLIE: { color: "hsl(var(--chart-1))", description: "Decryption & Cyber Ops" },
  DELTA: { color: "hsl(var(--chart-2))", description: "Field Infiltration & Recon" },
  ECHO: { color: "hsl(var(--chart-3))", description: "Data Analysis & Strategy" },
  BRAVO: { color: "hsl(var(--chart-4))", description: "Hardware & Engineering" },
};

export function TeamDashboard({ userTeam }: TeamDashboardProps) {
  const teamInfo = teamData[userTeam];

  return (
    <Card className="bg-background/70 backdrop-blur-md border-secondary/20" style={{ borderColor: teamInfo.color }}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-widest flex items-center justify-between" style={{ color: teamInfo.color }}>
          <span>[ TEAM {userTeam} DASHBOARD ]</span>
          <span className="text-sm font-code text-muted-foreground">{teamInfo.description}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-6 font-code text-sm">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" style={{ color: teamInfo.color }} />
            <div>
              <p className="text-muted-foreground">Operatives</p>
              <p className="text-lg font-bold">62</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6" style={{ color: teamInfo.color }} />
            <div>
              <p className="text-muted-foreground">Missions Complete</p>
              <p className="text-lg font-bold">4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" style={{ color: teamInfo.color }} />
            <div>
              <p className="text-muted-foreground">Success Rate</p>
              <p className="text-lg font-bold">87%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6" style={{ color: teamInfo.color }} />
            <div>
              <p className="text-muted-foreground">Team Impact</p>
              <p className="text-lg font-bold">HIGH</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
