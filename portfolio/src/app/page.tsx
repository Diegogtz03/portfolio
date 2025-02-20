"use client";

import ShaderLogo from "@/components/home/ShaderLogo";
import gsap from "gsap";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { GlowEffect } from "@/components/ui/glow-effect";
import Image from "next/image";
import useMouseDistanceStore from "@/helper/mouseDistance";
import localFont from "next/font/local";

// @ts-ignore
import buzz from "buzz";

const manifold = localFont({
  src: "../../public/media/fonts/manifold-thin.otf",
});

class SoundPlayer {
  intro: buzz.sound;
  currentSong: buzz.sound;
  hasPlayedIntro: boolean;
  musicStarted: boolean;
  volume: number;
  songList: string[];
  queue: string[];

  CROSS_FADE_DURATION = 5000;

  constructor({ songList }: { songList: string[] }) {
    this.intro = new buzz.sound("/media/sounds/intro.mp3");
    this.hasPlayedIntro = false;
    this.musicStarted = false;
    this.songList = songList;
    this.queue = songList.sort(() => Math.random() - 0.5);
    this.volume = 50;
  }

  playIntro() {
    if (!this.hasPlayedIntro) {
      this.intro.play().fadeIn(this.CROSS_FADE_DURATION);
      this.hasPlayedIntro = true;

      this.intro.bind("ended", () => {
        setTimeout(() => {
          this.startMusic();
        }, 2000);
      });

      this.intro.bind("timeupdate", () => {
        if (
          this.intro.getTime() >=
          this.intro.getDuration() - this.CROSS_FADE_DURATION / 1000
        ) {
          this.intro.fadeOut(this.CROSS_FADE_DURATION);

          this.intro.unbind("timeupdate");
        }
      });
    }
  }

  startMusic() {
    this.musicStarted = true;
    this.playNextSong();
  }

  playNextSong() {
    if (this.musicStarted) {
      if (this.currentSong) {
        this.currentSong.fadeOut(this.CROSS_FADE_DURATION);
      }

      this.currentSong = new buzz.sound(`/media/music/${this.getNextSong()}`, {
        loop: false,
        volume: this.volume,
      });

      this.currentSong.play().fadeIn(this.CROSS_FADE_DURATION);

      this.currentSong.bind("timeupdate", () => {
        if (
          this.currentSong.getTime() >=
          this.currentSong.getDuration() - this.CROSS_FADE_DURATION / 1000
        ) {
          this.playNextSong();
        }
      });
    }
  }

  getNextSong() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    } else {
      this.queue = this.songList.sort(() => Math.random() - 0.5);
      return this.queue.shift();
    }
  }

  setVolume(volume: number) {
    if (this.currentSong && this.musicStarted) {
      this.currentSong.setVolume(volume);
      this.volume = volume;
    }
  }

  togglePause() {
    if (this.currentSong) {
      this.currentSong.togglePlay();
    }
  }

  playTransitionSound() {
    if (this.currentSong) {
      // fade out current song
      this.currentSong.fadeOut(200);

      setTimeout(() => {
        this.currentSong.togglePlay();
      }, 200);

      // play transition sound
      setTimeout(() => {
        const transitionSound = new buzz.sound(
          "/media/sounds/severanceElevator.mp3"
        );

        transitionSound
          .play({
            volume: 1,
          })
          .fadeOut(5000);

        transitionSound.setSpeed(2);
      }, 300);
    }
  }
}

export default function Home() {
  const normalVideoRef = useRef<HTMLVideoElement>(null);
  const reversedVideoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<string>("");
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [hasLogoHovered, setHasLogoHovered] = useState<boolean>(false);
  const [userInitialClicked, setUserInitialClicked] = useState<boolean>(false);
  const [
    initialAnimationStageOneComplete,
    setInitialAnimationStageOneComplete,
  ] = useState<boolean>(false);
  const [
    initialAnimationStageTwoComplete,
    setInitialAnimationStageTwoComplete,
  ] = useState<boolean>(false);
  const [isGlowEffectActive, setIsGlowEffectActive] = useState(false);
  const distance = useMouseDistanceStore((state) => state.distance);
  const [soundPlayerState, setSoundPlayerState] = useState<SoundPlayer | null>(
    null
  );
  const [videoBorderAmount, setVideoBorderAmount] = useState<number>(0);

  const isPhone = window ? window.innerWidth <= 600 : false;

  let soundPlayer: SoundPlayer;
  const borderAnimationControls = useAnimationControls();

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        let selectedVideo = data[Math.floor(Math.random() * data.length)];

        if (selectedVideo.includes("_rev")) {
          selectedVideo = selectedVideo.split("_rev")[0] + ".mp4";
        }

        setVideo(selectedVideo);
      });

    fetch("/api/music")
      .then((res) => res.json())
      .then((data) => {
        soundPlayer = new SoundPlayer({ songList: data });
        setSoundPlayerState(soundPlayer);
      });

    document.addEventListener("click", handleUserInitialClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleUserInitialClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (userInitialClicked) {
      const newVolume = Math.min(
        100,
        Math.max(0, ((500 - distance) / 500) * 100)
      );

      soundPlayerState?.setVolume(newVolume);
    }

    const edgeSize = Math.min(100, Math.max(0, ((300 - distance) / 300) * 100));
    // setEdgeSize(edgeSize);
  }, [distance, soundPlayerState]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      if (soundPlayer) {
        soundPlayer.playNextSong();
      }
    } else if (e.key === "m" || e.key === "M") {
      soundPlayer.togglePause();
    }
  };

  const handleUserInitialClick = () => {
    if (!userInitialClicked) {
      setUserInitialClicked(true);
      setInitialAnimationStageOneComplete(true);
      soundPlayer.playIntro();
    }
  };

  // TODO: add page transition (tunnel, fade, etc)
  const runPageTransition = (): void => {
    if (isGlowEffectActive) {
      soundPlayerState?.playTransitionSound();

      setTimeout(() => {
        if (isPhone) {
          borderAnimationControls.start(
            { border: "100px solid white" },
            { duration: 1.5 }
          );
        } else {
          borderAnimationControls.start(
            { border: "250px solid white" },
            { duration: 1.5 }
          );
        }

        setTimeout(() => {
          borderAnimationControls.start(
            { border: "0px solid white" },
            { duration: 0.3 }
          );
        }, 1800);

        setTimeout(() => {
          gsap.to("#overlay", {
            duration: 0.8,
            backgroundColor: "white",
            opacity: 1,
            zIndex: 10,
          });
        }, 2400);
        // Fade all sounds out and play transition sound?

        // On end, redirect to /home
        setTimeout(() => {
          if (window) {
            window.location.href = "/home";
          }
        }, 2800);
      }, 500);
    }
  };

  const handleVideoEnd = () => {
    if (isReversed) {
      setIsReversed(false);
      if (normalVideoRef.current) {
        normalVideoRef.current.style.display = "block";
        if (reversedVideoRef.current) {
          reversedVideoRef.current.style.display = "none";
        }
        normalVideoRef.current.currentTime = 0;
        normalVideoRef.current.play();
      }
    } else {
      setIsReversed(true);
      if (reversedVideoRef.current) {
        reversedVideoRef.current.style.display = "block";
        if (normalVideoRef.current) {
          normalVideoRef.current.style.display = "none";
        }
        reversedVideoRef.current.currentTime = 0;
        reversedVideoRef.current.play();
      }
    }
  };

  const handleLogoHover = (hover: boolean) => {
    if (isGlowEffectActive) {
      if (!hasLogoHovered) {
        setHasLogoHovered(true);
      }

      if (hover) {
        borderAnimationControls.start({
          border: "20px solid white",
          borderImage: "",
        });

        setVideoBorderAmount(20);
      } else {
        borderAnimationControls.start({ border: "0px solid white" });

        setVideoBorderAmount(0);
      }
    }
  };

  return (
    <main className="bg-black">
      <div
        className="bg-transparent h-screen w-screen opacity-0 absolute"
        id="overlay"
      />
      <AnimatePresence mode="wait">
        {!initialAnimationStageTwoComplete && (
          <motion.div
            key={"stage-one-container"}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            className="relative w-full h-screen bg-black"
          >
            {!initialAnimationStageOneComplete && (
              <motion.h1
                key={"stage-one"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4 }}
                className="absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto flex items-center justify-center text-white tracking-wide"
              >
                <motion.span
                  className={`text-2xl tracking-wide select-none`}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  [&nbsp;&nbsp;
                </motion.span>
                <span
                  className={`${manifold.className} text-2xl tracking-wider select-none`}
                >
                  click to enter
                </span>
                <motion.span
                  className={`text-2xl tracking-wide select-none`}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  &nbsp;&nbsp;]
                </motion.span>
              </motion.h1>
            )}
            {initialAnimationStageOneComplete &&
              userInitialClicked &&
              !initialAnimationStageTwoComplete && (
                <motion.div
                  key="stage-two"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 4 }}
                  exit={{ opacity: 0 }}
                  onAnimationComplete={() => {
                    setInitialAnimationStageTwoComplete(true);

                    setTimeout(() => {
                      if (normalVideoRef.current) {
                        normalVideoRef.current.play();
                      }
                    }, 200);
                  }}
                  className="absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto flex items-center justify-center"
                >
                  <Image
                    src="/media/assets/lumon-slowed.gif"
                    alt="lumon roledex"
                    width={250}
                    height={250}
                  />
                </motion.div>
              )}
          </motion.div>
        )}
      </AnimatePresence>

      {isGlowEffectActive && (
        <GlowEffect
          colors={[
            "rgba(239, 223, 210, 0.5)",
            "rgba(187, 187, 187, 0.5)",
            "rgba(239, 223, 210, 0.5)",
            "rgba(187, 187, 187, 0.5)",
            "rgba(239, 223, 210, 0.5)",
            "rgba(187, 187, 187, 0.5)",
            "rgba(239, 223, 210, 0.5)",
            "rgba(187, 187, 187, 0.5)",
          ]}
          duration={10}
          blur="strongest"
          mode="rotate"
        />
      )}
      <motion.div
        className="flex bg-black h-screen items-center justify-center"
        initial={{ border: "0px solid black" }}
        animate={borderAnimationControls}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center h-full w-full relative">
          {userInitialClicked && initialAnimationStageTwoComplete && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onAnimationComplete={() => setIsGlowEffectActive(true)}
                style={{
                  width: "inherit",
                  height: "inherit",
                }}
                className="bg-gray-200"
                transition={{ duration: 15, delay: 4 }}
              >
                {video && (
                  <video
                    src={`/media/videos/${video}`}
                    preload="auto"
                    loop={false}
                    muted
                    className={`h-full w-full object-cover transition-all duration-700`}
                    style={{ borderRadius: `${videoBorderAmount}px` }}
                    ref={normalVideoRef}
                    onEnded={handleVideoEnd}
                  />
                )}
                {video && (
                  <video
                    style={{
                      display: "none",
                      borderRadius: `${videoBorderAmount}px`,
                    }}
                    src={`/media/videos/${video.split(".")[0]}_rev.mp4`}
                    preload="auto"
                    loop={false}
                    muted
                    className={`h-full w-full object-cover transition-all duration-700`}
                    ref={reversedVideoRef}
                    onEnded={handleVideoEnd}
                  />
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1 }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ duration: 8, delay: 7 }}
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  alignContent: "center",
                  position: "absolute",
                }}
                onClick={() => runPageTransition()}
              >
                <AnimatePresence mode="wait">
                  {!hasLogoHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, delay: 15 }}
                      className="h-fit w-fit z-[150]"
                    >
                      <motion.iframe
                        src="https://cdn.lottielab.com/l/chu2FzKjGoCMd0.html"
                        width="200"
                        height="200"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-20 max-h-15 overflow-hidden aspect-square [clip-path:inset(0_0_20%_0)] z-[150] rotate-180 -bottom-[28%]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <ShaderLogo
                  onHover={handleLogoHover}
                  cursorClass={isGlowEffectActive ? "cursor-pointer" : ""}
                />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
