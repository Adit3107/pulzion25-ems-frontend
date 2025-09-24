"use client";

import { useState, useEffect } from 'react';

export function LiveTimestamp() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    setTimestamp(`TIMESTAMP: ${date} // ${time}`);
  }, []);

  return <p>{timestamp}</p>;
}
