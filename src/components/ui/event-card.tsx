"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { EventIcon, type IconName } from "./event-icon";
import { Badge } from "./badge";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: {
    name: string;
    icon: IconName;
    description: string;
    status: "Locked" | "Unlocked";
    priority: "Critical" | "High" | "Medium" | "Low";
  };
  isActive: boolean;
}

export function EventCard({ event, isActive, className }: EventCardProps) {
  const priorityStyles = {
    Critical: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_15px_theme(colors.destructive)]",
    High: "bg-chart-4 text-primary-foreground hover:bg-chart-4/90",
    Medium: "bg-chart-1 text-primary-foreground hover:bg-chart-1/90",
    Low: "bg-muted text-muted-foreground hover:bg-muted/90",
  };
  
  const statusStyles = {
    Locked: "bg-foreground/20 text-foreground/70 border-foreground/30",
    Unlocked: "bg-primary/20 text-primary border-primary/30",
  }

  return (
    <div className={cn(
      "transition-all duration-500 ease-out",
      isActive ? "scale-100" : "scale-90 opacity-60",
      className
    )}>
      <Card
        className={cn(
          "bg-card/80 backdrop-blur-sm border-2 w-full h-full flex flex-col transition-all duration-300",
          isActive ? "border-secondary shadow-[0_0_25px_hsl(var(--secondary))]" : "border-primary/20",
          event.status === "Locked" ? "grayscale" : ""
        )}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={cn("font-code", statusStyles[event.status])}>
              {event.status}
            </Badge>
            <div className="text-primary font-code text-sm">#PZN25</div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center flex-grow p-6 pt-0">
          <div className="mb-4">
            <EventIcon name={event.icon} className="w-20 h-20 text-primary/80" />
          </div>
          <h3 className="font-headline text-2xl font-bold text-foreground mb-2">
            {event.name}
          </h3>
          <p className="text-muted-foreground font-code text-sm mb-6 h-12">
            {event.description}
          </p>
          <Button
            disabled={event.status === "Locked"}
            className={cn(
                "w-full font-code tracking-wider", 
                priorityStyles[event.priority]
            )}
          >
            PRIORITY: {event.priority.toUpperCase()}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
