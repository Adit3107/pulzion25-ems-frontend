"use client";

import { useState, useEffect, useRef } from 'react';

export function useCounter(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          startTimeRef.current = Date.now();
          
          const animate = () => {
            const now = Date.now();
            const elapsedTime = now - (startTimeRef.current || now);
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * endValue);
            setCount(currentCount);

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animate);
            } else {
              setCount(endValue); // Ensure it ends exactly on the endValue
            }
          };
          animationFrameRef.current = requestAnimationFrame(animate);
          // We can disconnect the observer after the animation starts if we only want it to run once.
          // observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [endValue, duration]);

  return { count, ref };
}
