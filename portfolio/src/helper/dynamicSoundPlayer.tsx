"use client";

import { Howl } from "howler";
import { useState, useEffect, useRef, useCallback } from "react";
import useMouseDistanceStore from "@/helper/mouseDistance";

export default function DynamicSoundPlayer() {
  const files = useRef<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentHowl, setCurrentHowl] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const crossfadeDuration = 5000;

  const distance = useMouseDistanceStore((state) => state.distance);

  // Fetch files and initialize the queue
  useEffect(() => {
    fetch("/api/music")
      .then((res) => res.json())
      .then((data) => {
        files.current = data;
        generateQueue();
      });

    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (currentHowl) {
      const newVolume = Math.max(0, 1 - distance / 700);
      currentHowl.volume(newVolume);
    }
  }, [distance]);

  const generateQueue = () => {
    const shuffledQueue = [...files.current].sort(() => Math.random() - 0.5);
    setQueue(shuffledQueue);
    setCurrentIndex(0);
  };

  // Play a song using Howler and handle crossfade logic
  const playSong = useCallback(
    (src: string) => {
      if (currentHowl) {
        currentHowl.fade(1, 0, crossfadeDuration);
        setTimeout(() => currentHowl.stop().unload(), crossfadeDuration);
      }

      const newHowl = new Howl({
        src: `/media/music/${src}`,
        volume: 0,
        loop: false,
        onend: () => skipToNextSong(),
      });

      setCurrentHowl(newHowl);
      newHowl.play();
      newHowl.fade(0, 1, crossfadeDuration);
    },
    [currentHowl]
  );

  // Handle initial play on user interaction
  const handleUserInteraction = useCallback(() => {
    if (!isPlaying && queue.length > 0 && currentIndex !== null) {
      playSong(queue[currentIndex]);
      setIsPlaying(true);
    }
  }, [isPlaying, queue, currentIndex, playSong]);

  // Skip to the next song
  const skipToNextSong = useCallback(() => {
    if (!queue.length) return;

    let nextIndex = ((currentIndex ?? 0) + 1) % queue.length;
    if (nextIndex === 0) generateQueue(); // Regenerate if we reach the end of the queue

    setCurrentIndex(nextIndex);
    playSong(queue[nextIndex]);
  }, [queue, currentIndex, playSong]);

  // Spacebar event listener for skipping
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        skipToNextSong();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [skipToNextSong]);

  // Automatically crossfade when the song is about to end
  useEffect(() => {
    if (currentHowl) {
      const interval = setInterval(() => {
        const remaining = currentHowl.duration() - currentHowl.seek();
        if (remaining <= 5 && queue.length > 1) {
          clearInterval(interval); // Avoid multiple skips
          skipToNextSong();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentHowl, queue, skipToNextSong]);

  return (
    <div>
      <p>Current song: {queue[currentIndex ?? 0] || "No song selected"}</p>
    </div>
  );
}
