"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { type MissionEvent } from "@/app/events/page";
import { EventIcon } from "./event-icon";
import { Clock, Users, Shield } from "lucide-react";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: MissionEvent;
  onCardClick: () => void;
}

export function EventCard({ event, onCardClick, className }: EventCardProps) {
  const difficultyColors: Record<string, string> = {
    Restricted: "text-chart-5",
    Classified: "text-chart-4",
    Confidential: "text-chart-2",
    "Top Secret": "text-chart-1",
  };

  const getDifficultyClass = (difficulty: string) => {
    return difficultyColors[difficulty] || "text-foreground";
  };
  
  return (
    <Card
      onClick={onCardClick}
      className={cn(
        "bg-background/70 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group flex flex-col",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 border border-primary/30 rounded-md group-hover:bg-primary/20 transition-colors">
            <EventIcon name={event.icon} className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline text-xl text-primary">{event.name}</CardTitle>
            <p className="text-sm text-secondary font-code">{event.category}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground text-sm flex-grow">{event.description}</p>
        <div className="mt-4 border-t border-border/50 pt-4 space-y-2 text-xs font-code">
            <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary"/>
                <span>Difficulty: <span className={getDifficultyClass(event.difficulty)}>{event.difficulty}</span></span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary"/>
                <span>Team Size: {event.teamSize}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary"/>
                <span>Duration: {event.duration}</span>
            </div>
        </div>
        <Button variant="outline" className="w-full mt-4 font-bold tracking-wider">
          VIEW BRIEFING
        </Button>
      </CardContent>
    </Card>
  );
}
