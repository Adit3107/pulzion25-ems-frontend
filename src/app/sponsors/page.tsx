"use client";

import React, { useState } from "react";
import Header from "@/components/layout/header";
import ElectricBorder from "@/components/ui/electric-border";
// import SponsorCard from "@/components/ui/sponsor-card";
// import ProfileCard from "@/components/ui/ProfileCard";
import Image from "next/image";

const HARD_CODED_SPONSOR = {
  title: "Tech Innovators Corp",
  description:
    "Leading technology solutions provider supporting innovation in the digital space with cutting-edge products and services.",
  website: "https://techinnovators.com",
  variant: "featured" as const,
};

export default function SponsorsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized position (-1 to 1) for more precise control
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    setMousePositions(prev => ({
      ...prev,
      [cardIndex]: {
        x: normalizedX,
        y: normalizedY
      }
    }));
  };

  const handleMouseLeave = (cardIndex: number) => {
    setHoveredCard(null);
    setMousePositions(prev => ({
      ...prev,
      [cardIndex]: { x: 0, y: 0 }
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
      <Header />

      <main className="pt-12 pb-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Responsive grid for ElectricBorder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {[0, 1, 2].map((cardIndex) => {
              const isHovered = hoveredCard === cardIndex;
              const mousePos = mousePositions[cardIndex] || { x: 0, y: 0 };
              
              // Calculate 3D transform values
              const tiltX = isHovered ? -mousePos.y * 20 : 0; // Inverted Y for natural tilt
              const tiltY = isHovered ? mousePos.x * 20 : 0;
              const translateZ = isHovered ? 30 : 0;
              const scale = isHovered ? 1.05 : 1;
              
              // Calculate dynamic glow position (0 to 100%)
              const glowX = isHovered ? (mousePos.x + 1) * 50 : 50; // Convert -1,1 to 0,100
              const glowY = isHovered ? (mousePos.y + 1) * 50 : 50;
              
              return (
                <div
                  key={cardIndex}
                  className="perspective-1000"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="transform-gpu preserve-3d transition-all duration-200 ease-out cursor-pointer relative"
                    style={{
                      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${translateZ}px) scale3d(${scale}, ${scale}, ${scale})`,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.1s ease-out',
                    }}
                    onMouseEnter={() => setHoveredCard(cardIndex)}
                    onMouseMove={(e) => handleMouseMove(e, cardIndex)}
                    onMouseLeave={() => handleMouseLeave(cardIndex)}
                  >
                    {/* Dynamic glow that follows cursor */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-200"
                      style={{
                        background: isHovered 
                          ? `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(79, 230, 238, 0.4) 0%, rgba(79, 230, 238, 0.2) 40%, transparent 70%)`
                          : 'transparent',
                        opacity: isHovered ? 1 : 0,
                        transform: 'translateZ(10px)',
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    <ElectricBorder
                      color="#4fe6ee"
                        speed={2}
                        chaos={0.5}
                        thickness={3}
                        style={{ borderRadius: 12, padding: 8 }}
                      >
                        <div 
                          className="w-full aspect-square overflow-hidden rounded-[8px] relative group"
                          style={{
                            // Parallax effect - inner content moves at different speed
                            transform: isHovered 
                              ? `translateZ(25px) translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)` 
                              : 'translateZ(0px)',
                            transition: 'transform 0.15s ease-out',
                            background: isHovered
                              ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.95) 0%, rgba(30, 41, 59, 0.98) 25%, rgba(15, 23, 42, 1) 75%, rgba(2, 8, 23, 1) 100%)'
                              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 25%, rgba(2, 8, 23, 0.98) 75%, rgba(0, 0, 0, 1) 100%)',
                            border: `1px solid ${isHovered ? 'rgba(79, 230, 238, 0.3)' : 'rgba(79, 230, 238, 0.15)'}`,
                            boxShadow: isHovered 
                              ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(79, 230, 238, 0.15)'
                              : 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <Image
                            src="/campus.png"
                            alt="Campus View"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            priority
                            style={{
                              // Additional parallax for the image itself
                              transform: isHovered 
                                ? `scale(1.02) translateX(${mousePos.x * -3}px) translateY(${mousePos.y * -3}px)`
                                : 'scale(1)',
                              transition: 'transform 0.2s ease-out'
                            }}
                          />
                        </div>
                      </ElectricBorder>
                    </div>
                  </div>
              );
            })}
          </div>

          {/* Sponsor Profile Cards Section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-20">
            <ProfileCard
              name="TechCorp Solutions"
              title="Platinum Sponsor"
              handle="techcorp"
              status="Partner"
              contactText="Visit Website"
              avatarUrl="/campus.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open('https://techcorp.com', '_blank')}
            />
            
            <ProfileCard
              name="Innovation Labs"
              title="Gold Sponsor"
              handle="innovationlabs"
              status="Partner"
              contactText="Learn More"
              avatarUrl="/campus.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open('https://innovationlabs.com', '_blank')}
            />
            
            <ProfileCard
              name="Digital Pioneers"
              title="Silver Sponsor"
              handle="digitalpioneers"
              status="Partner"
              contactText="Contact Us"
              avatarUrl="/campus.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open('https://digitalpioneers.com', '_blank')}
            />
          </div> */}

    
          {/* Single sponsor card section */}
          <div className="max-w-2xl mx-auto text-center">
          </div>
        </div>
      </main>
    </div>
  );
}
