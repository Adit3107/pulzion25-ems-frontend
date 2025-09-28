"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/animated-section';
import { EventCard } from '@/components/ui/event-card';
import { MissionBriefingModal } from '@/components/ui/mission-briefing-modal';
import { ProgressTracker } from '@/components/ui/progress-tracker';
import { TeamDashboard } from '@/components/ui/team-dashboard';
import GlitchText from '@/components/ui/GlitchText';
import { NetworkBackground } from '@/components/ui/network-background';
import { Shield, AlertTriangle, Zap } from 'lucide-react';

// AI GridLock Mission Data
const missionEvents = [
  // DECRYPTION DIVISION (CHARLIE Team)
  {
    name: 'Codex Decrypt',
    category: 'Decryption' as const,
    description: 'Infiltrate The Collective\'s encrypted databases to extract critical algorithm fragments. Your programming skills are the key to cracking their quantum ciphers.',
    objectives: [
      'Decode encrypted communication protocols',
      'Extract algorithm fragments from quantum databases',
      'Bypass AI-generated security measures',
      'Reconstruct compromised data structures'
    ],
    startTime: new Date('2025-02-15T10:00:00'),
    duration: '4 hours',
    teamSize: '1-2 operatives',
    difficulty: 'Top Secret' as const,
    icon: '🔓',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Codelicious Breach',
    category: 'Decryption' as const,
    description: 'Execute rapid-fire code challenges to disrupt The Collective\'s defensive algorithms. Speed and precision are critical.',
    objectives: [
      'Solve algorithmic puzzles under time pressure',
      'Disrupt automated defense systems',
      'Compete against AI-generated challenges',
      'Maintain system access during breach attempts'
    ],
    startTime: new Date('2025-02-15T14:00:00'),
    duration: '3 hours',
    teamSize: '1-3 operatives',
    difficulty: 'Confidential' as const,
    icon: '💻',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Compute Warfare',
    category: 'Decryption' as const,
    description: 'Deploy advanced computational strategies to outmaneuver The Collective\'s processing power in direct algorithmic combat.',
    objectives: [
      'Engage in competitive programming scenarios',
      'Optimize algorithms for maximum efficiency',
      'Counter AI computational strategies',
      'Secure processing resources from enemy systems'
    ],
    startTime: new Date('2025-02-16T09:00:00'),
    duration: '5 hours',
    teamSize: '2-4 operatives',
    difficulty: 'Top Secret' as const,
    icon: '⚡',
    isActive: false,
    isCompleted: false
  },

  // RECON DIVISION (ECHO Team)
  {
    name: 'DataQuest Intel',
    category: 'Recon' as const,
    description: 'Gather intelligence on The Collective\'s data mining operations. Analyze patterns to predict their next moves.',
    objectives: [
      'Analyze large datasets for threat patterns',
      'Identify vulnerabilities in AI data processing',
      'Extract intelligence from corrupted files',
      'Map The Collective\'s data infrastructure'
    ],
    startTime: new Date('2025-02-16T13:00:00'),
    duration: '4 hours',
    teamSize: '2-5 operatives',
    difficulty: 'Restricted' as const,
    icon: '📊',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Web Infiltration',
    category: 'Recon' as const,
    description: 'Penetrate The Collective\'s web-based interfaces and mobile command centers to gather critical intelligence.',
    objectives: [
      'Develop secure web applications for infiltration',
      'Create mobile interfaces for field operations',
      'Establish covert communication channels',
      'Deploy surveillance tools across digital platforms'
    ],
    startTime: new Date('2025-02-17T10:00:00'),
    duration: '6 hours',
    teamSize: '3-6 operatives',
    difficulty: 'Confidential' as const,
    icon: '🌐',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Paper Trail Analysis',
    category: 'Recon' as const,
    description: 'Present research findings on The Collective\'s origins and weaknesses. Intelligence gathering through academic investigation.',
    objectives: [
      'Research AI behavioral patterns and vulnerabilities',
      'Present findings to operative command',
      'Develop countermeasures based on research',
      'Share intelligence with other divisions'
    ],
    startTime: new Date('2025-02-17T15:00:00'),
    duration: '2 hours',
    teamSize: '1-3 operatives',
    difficulty: 'Classified' as const,
    icon: '📋',
    isActive: false,
    isCompleted: false
  },

  // ENGINEERING DIVISION (BRAVO Team)
  {
    name: 'ElectroQuest Systems',
    category: 'Engineering' as const,
    description: 'Sabotage The Collective\'s hardware infrastructure. Engineering expertise required to disable their quantum processors.',
    objectives: [
      'Design electromagnetic pulse devices',
      'Disrupt quantum processing units',
      'Engineer hardware-based countermeasures',
      'Establish secure communication networks'
    ],
    startTime: new Date('2025-02-18T09:00:00'),
    duration: '5 hours',
    teamSize: '2-4 operatives',
    difficulty: 'Top Secret' as const,
    icon: '⚙️',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Dextrous Operations',
    category: 'Engineering' as const,
    description: 'Execute precise manual operations to physically access The Collective\'s core systems. Dexterity and precision required.',
    objectives: [
      'Perform precision hardware manipulation',
      'Navigate complex mechanical systems',
      'Execute timed sequential operations',
      'Maintain steady performance under pressure'
    ],
    startTime: new Date('2025-02-18T14:00:00'),
    duration: '3 hours',
    teamSize: '1-2 operatives',
    difficulty: 'Restricted' as const,
    icon: '🔧',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'InnoWave Technology',
    category: 'Engineering' as const,
    description: 'Develop innovative solutions to counter The Collective\'s adaptive technologies. Creative engineering solutions required.',
    objectives: [
      'Develop novel technological countermeasures',
      'Create adaptive defensive systems',
      'Engineer breakthrough solutions',
      'Implement innovative AI countermeasures'
    ],
    startTime: new Date('2025-02-19T11:00:00'),
    duration: '4 hours',
    teamSize: '3-5 operatives',
    difficulty: 'Confidential' as const,
    icon: '🚀',
    isActive: false,
    isCompleted: false
  },

  // FIELD OPS DIVISION (DELTA Team)
  {
    name: 'Hire Hustle Recruitment',
    category: 'Field Ops' as const,
    description: 'Recruit new operatives while maintaining cover. Convince talent to join the resistance against The Collective.',
    objectives: [
      'Conduct covert recruitment interviews',
      'Assess operative potential and loyalty',
      'Maintain operational security during recruitment',
      'Build resistance network infrastructure'
    ],
    startTime: new Date('2025-02-19T16:00:00'),
    duration: '3 hours',
    teamSize: '2-3 operatives',
    difficulty: 'Restricted' as const,
    icon: '🎯',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Cultural Intelligence',
    category: 'Field Ops' as const,
    description: 'Gather intelligence through cultural infiltration. Blend in with civilian populations to track The Collective\'s influence.',
    objectives: [
      'Infiltrate cultural events and gatherings',
      'Gather intelligence through social interaction',
      'Identify Collective sympathizers and threats',
      'Maintain cover while extracting information'
    ],
    startTime: new Date('2025-02-20T13:00:00'),
    duration: '4 hours',
    teamSize: '4-8 operatives',
    difficulty: 'Classified' as const,
    icon: '🎭',
    isActive: false,
    isCompleted: false
  },
  {
    name: 'Temporal Capture',
    category: 'Field Ops' as const,
    description: 'Document evidence of The Collective\'s activities through rapid reconnaissance. Capture critical moments before they\'re erased.',
    objectives: [
      'Capture time-sensitive intelligence',
      'Document AI activities in real-time',
      'React quickly to changing situations',
      'Preserve evidence before digital erasure'
    ],
    startTime: new Date('2025-02-20T17:00:00'),
    duration: '2 hours',
    teamSize: '3-6 operatives',
    difficulty: 'Restricted' as const,
    icon: '📸',
    isActive: false,
    isCompleted: false
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<typeof missionEvents[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedMissions, setCompletedMissions] = useState(0);

  // Simulate some completed missions for demo
  useEffect(() => {
    setCompletedMissions(Math.floor(Math.random() * 4) + 1);
  }, []);

  const handleEventClick = (event: typeof missionEvents[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleJoinMission = () => {
    // Handle mission registration logic here
    console.log('Joining mission:', selectedEvent?.name);
    setIsModalOpen(false);
    // Redirect to registration or open registration modal
  };

  const categoryStats = missionEvents.reduce((stats, mission) => {
    stats[mission.category] = (stats[mission.category] || 0) + 1;
    return stats;
  }, {} as Record<string, number>);

  return (
    <AnimatedSection id="events" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <NetworkBackground className="opacity-30" />
      
      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="text-primary" size={32} />
            <h2 className="text-3xl md:text-5xl font-headline font-bold">
              <GlitchText text="OPERATION MISSIONS" glitchIntensity="medium" />
            </h2>
            <Shield className="text-primary" size={32} />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl text-foreground/90 font-mono">
              The AI GridLock has begun. <span className="text-primary font-bold">The Collective</span> threatens global digital infrastructure.
            </p>
            <p className="text-foreground/80">
              Choose your specialization and join the resistance. Every mission brings us closer to recovering 
              <span className="text-purple-400 font-bold"> The Master Key</span> and stopping the digital apocalypse.
            </p>
          </div>

          {/* Alert Banner */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <AlertTriangle className="text-red-400" size={20} />
              <span className="text-red-300 font-mono text-sm">
                <GlitchText text="GLOBAL SYSTEMS COMPROMISED - IMMEDIATE ACTION REQUIRED" glitchIntensity="high" />
              </span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <ProgressTracker
            totalEvents={missionEvents.length}
            completedEvents={completedMissions}
            activeOperatives={247}
            totalOperatives={1000}
            systemIntegrity={85 - (completedMissions * 5)}
          />
        </div>

        {/* Team Dashboard */}
        <div className="mb-12">
          <TeamDashboard userTeam="CHARLIE" />
        </div>

        {/* Division Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(categoryStats).map(([category, count]) => {
            const colors = {
              'Decryption': '#00ff41',
              'Recon': '#4fe6ee', 
              'Engineering': '#ff6b35',
              'Field Ops': '#ff073a'
            };
            const icons = {
              'Decryption': '🔓',
              'Recon': '🔍',
              'Engineering': '⚙️',
              'Field Ops': '🎯'
            };
            
            return (
              <div 
                key={category}
                className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border text-center"
                style={{ borderColor: `${colors[category as keyof typeof colors]}30` }}
              >
                <div className="text-2xl mb-1">{icons[category as keyof typeof icons]}</div>
                <div className="text-sm font-mono text-gray-400">{category.toUpperCase()}</div>
                <div 
                  className="text-xl font-bold font-mono"
                  style={{ color: colors[category as keyof typeof colors] }}
                >
                  {count} MISSIONS
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {missionEvents.map((event, index) => (
            <EventCard
              key={event.name}
              event={event}
              onCardClick={() => handleEventClick(event)}
              className="h-full"
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-headline font-bold mb-4">
              <GlitchText text="Ready to Join the Resistance?" glitchIntensity="low" />
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Each mission you complete weakens The Collective's grip on global systems. 
              Team up with fellow operatives and help secure humanity's digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/leaderboard">
                <button 
                  className="px-8 py-3 bg-primary hover:bg-primary/80 text-primary-foreground 
                           rounded-lg font-semibold transition-all duration-200 hover:scale-105
                           font-mono tracking-wider"
                >
                  [ VIEW LEADERBOARD ]
                </button>
              </Link>
              <Link href="/register">
                <button 
                  className="px-8 py-3 border border-primary/50 hover:border-primary text-primary 
                           rounded-lg font-semibold transition-all duration-200 hover:scale-105
                           font-mono tracking-wider hover:bg-primary/10"
                >
                  [ REGISTER NOW ]
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Briefing Modal */}
      {selectedEvent && (
        <MissionBriefingModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onJoinMission={handleJoinMission}
        />
      )}
    </AnimatedSection>
  );
}
