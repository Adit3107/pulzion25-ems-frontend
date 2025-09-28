"use client";

import React, { useState, useEffect } from 'react';

interface Activity {
  type: 'win' | 'achievement' | 'milestone' | 'alert';
  team?: string;
  user?: string;
  event?: string;
  badge?: string;
  message?: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState<Activity[]>([]);
  const [newActivityIndex, setNewActivityIndex] = useState(-1);

  useEffect(() => {
    // Stagger the appearance of activities
    activities.forEach((activity, index) => {
      setTimeout(() => {
        setVisibleActivities(prev => [...prev, activity]);
        setNewActivityIndex(index);
        // Remove the "new" highlight after animation
        setTimeout(() => setNewActivityIndex(-1), 1000);
      }, index * 200);
    });
  }, [activities]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'win': return '🏆';
      case 'achievement': return '🎖️';
      case 'milestone': return '📊';
      case 'alert': return '⚠️';
      default: return '📡';
    }
  };

  const getActivityColor = (type: string, team?: string) => {
    if (team) {
      switch (team) {
        case 'CHARLIE': return '#00ff41';
        case 'DELTA': return '#ff073a';
        case 'ECHO': return '#4fe6ee';
        case 'BRAVO': return '#ff6b35';
      }
    }
    
    switch (type) {
      case 'win': return '#00ff41';
      case 'achievement': return '#ffff00';
      case 'milestone': return '#4fe6ee';
      case 'alert': return '#ff073a';
      default: return '#9ca3af';
    }
  };

  const formatActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'win':
        return `Team ${activity.team} secured ${activity.event}`;
      case 'achievement':
        return `${activity.user} unlocked "${activity.badge}"`;
      case 'milestone':
        return activity.message;
      case 'alert':
        return activity.message;
      default:
        return activity.message || 'Unknown activity';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/30 relative overflow-hidden h-fit">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(79, 230, 238, 0.1) 0px, rgba(79, 230, 238, 0.1) 1px, transparent 1px, transparent 10px)',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-mono font-bold text-cyan-400">
            📡 LIVE INTEL FEED
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-green-500">LIVE</span>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {visibleActivities.map((activity, index) => (
            <div
              key={index}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border transition-all duration-500 transform
                ${newActivityIndex === index 
                  ? 'border-cyan-400 bg-cyan-400/10 scale-102 animate-pulse' 
                  : 'border-gray-700/50 bg-black/30 hover:bg-gray-800/30'
                }
              `}
              style={{
                animation: newActivityIndex === index ? 'slideInRight 0.5s ease-out' : undefined
              }}
            >
              {/* Activity Icon */}
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: getActivityColor(activity.type, activity.team),
                  backgroundColor: `${getActivityColor(activity.type, activity.team)}20`,
                }}
              >
                <span className="text-sm">
                  {getActivityIcon(activity.type)}
                </span>
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm font-mono font-medium mb-1"
                  style={{ color: getActivityColor(activity.type, activity.team) }}
                >
                  {formatActivityText(activity)}
                </p>
                <p className="text-xs text-gray-400 font-mono">
                  {activity.time}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex-shrink-0">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getActivityColor(activity.type, activity.team) }}
                />
              </div>
            </div>
          ))}

          {/* Loading placeholder */}
          {visibleActivities.length < activities.length && (
            <div className="flex items-center justify-center p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono">
              {visibleActivities.length} RECENT ACTIVITIES
            </span>
            <button className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
              VIEW ALL →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.2);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 230, 238, 0.5);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 230, 238, 0.7);
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default ActivityFeed;