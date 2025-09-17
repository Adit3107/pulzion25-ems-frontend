"use client";

import Spline from '@splinetool/react-spline';

interface EventCardSplineProps {
    scene: string;
}

export function EventCardSpline({ scene }: EventCardSplineProps) {
  return (
    <div className="w-full h-full rounded-t-lg overflow-hidden">
      <Spline scene={scene} />
    </div>
  );
}
