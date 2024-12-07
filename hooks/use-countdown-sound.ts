import { useEffect, useRef } from 'react';

export function useCountdownSound(timeLeft: number, isPlaying: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create audio element only once
    if (!audioRef.current) {
      audioRef.current = new Audio('/beep.mp3');
      audioRef.current.volume = 0.5;
    }

    // Play sound during last 10 seconds
    if (isPlaying && timeLeft <= 10 && timeLeft > 0) {
      audioRef.current.play().catch(() => {
        // Ignore errors from browsers blocking autoplay
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [timeLeft, isPlaying]);
}