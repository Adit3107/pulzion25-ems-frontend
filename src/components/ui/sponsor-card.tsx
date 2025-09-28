"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ElectricBorder from './electric-border';

type SponsorCardProps = {
  title: string;
  description?: string;
  slug?: string;
  website?: string;
  className?: string;
  variant?: 'default' | 'featured';
};

export default function SponsorCard({
  title,
  description,
  slug,
  website,
  className,
  variant = 'default',
}: SponsorCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (slug) {
      router.push(`/sponsors/${encodeURIComponent(slug)}`);
      return;
    }
    if (website) {
      // open external site in new tab
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  const borderColor = variant === 'featured' ? '#A78BFA' : '#7DF9FF';
  const thickness = variant === 'featured' ? 3 : 2;

  return (
    <div className={"cursor-pointer " + (className ?? '')} onClick={handleClick} role="button" tabIndex={0}>
      <ElectricBorder color={borderColor} thickness={thickness} speed={1} chaos={0.6} style={{ borderRadius: 12, padding: 16 }}>
        <div className={"w-full h-full text-left " + (variant === 'featured' ? 'bg-transparent' : 'bg-transparent')}>
          <div className="flex flex-col justify-center h-full text-gray-100">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="mt-2 text-sm text-gray-300">{description}</p>}
          </div>
        </div>
      </ElectricBorder>
    </div>
  );
}
