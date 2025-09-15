"use client";

import { useCounter } from '@/hooks/use-counter';
import { formatNumber } from '@/lib/utils';

interface CounterProps {
    value: number;
    duration?: number;
}

export function Counter({ value, duration }: CounterProps) {
    const { count, ref } = useCounter(value, duration);
    return <span ref={ref}>{formatNumber(count)}</span>;
}
