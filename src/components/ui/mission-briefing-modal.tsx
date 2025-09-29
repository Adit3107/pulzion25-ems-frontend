"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { type MissionEvent } from "@/app/events/page";
import { Clock, Users, Shield, Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "./separator";

interface MissionBriefingModalProps {
  event: MissionEvent;
  isOpen: boolean;
  onClose: () => void;
  onJoinMission: () => void;
}

export function MissionBriefingModal({
  event,
  isOpen,
  onClose,
  onJoinMission,
}: MissionBriefingModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-background/90 backdrop-blur-lg border-secondary text-foreground">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-3">
            MISSION BRIEFING: {event.name}
          </DialogTitle>
          <DialogDescription className="font-code text-secondary">
            {event.category} Division // Review your objectives, operative.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 max-h-[60vh] overflow-y-auto pr-4">
          <p className="mb-6">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-code text-sm">
             <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary"/>
                <div>
                    <p className="text-muted-foreground">Difficulty</p>
                    <p className={getDifficultyClass(event.difficulty)}>{event.difficulty}</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary"/>
                <div>
                    <p className="text-muted-foreground">Team Size</p>
                    <p>{event.teamSize}</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary"/>
                <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p>{event.duration}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary"/>
                <div>
                    <p className="text-muted-foreground">Start Time</p>
                    <p>{event.startTime.toLocaleString()}</p>
                </div>
            </div>
          </div>

          <Separator className="my-6 bg-border/50"/>

          <div>
            <h3 className="font-headline text-lg text-secondary mb-4">[ PRIMARY OBJECTIVES ]</h3>
            <ul className="space-y-2 list-disc list-inside font-code text-muted-foreground">
              {event.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-bold">
            CLOSE
          </Button>
          <Button onClick={onJoinMission} className="font-bold bg-primary text-primary-foreground hover:bg-primary/90">
            JOIN MISSION
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
