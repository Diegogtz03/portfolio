"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const SOCIAL_LINKS = {
  github: "https://github.com/Diegogtz03",
  linkedin: "https://www.linkedin.com/in/diegogtzt",
  x: "https://x.com/diego_trevin",
};

export const ContactButton = () => {
  const [currentState, setCurrentState] = useState<
    "initial" | "socials" | "email" | "sent"
  >("initial");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCurrentState("initial");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleEmail = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          email: emailData.email,
          subject: "Portfolio Reach",
          message: emailData.message,
        }),
      });
      setCurrentState("sent");
      setTimeout(() => {
        setCurrentState("initial");
      }, 3000);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-[401]" ref={containerRef}>
      <motion.button
        animate={{
          scale:
            currentState !== "initial" && currentState !== "sent" ? 0.95 : 1,
          opacity:
            currentState !== "initial" && currentState !== "sent" ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="bg-btn-bg text-dark-text text-md font-bold rounded-lg px-4 py-2 border border-btn-stroke hover:bg-btn-stroke overflow-hidden"
        onClick={() => currentState === "initial" && setCurrentState("socials")}
      >
        <AnimatePresence mode="wait">
          {currentState === "sent" ? (
            <motion.div
              key="sent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Sent!</span>
            </motion.div>
          ) : (
            <motion.span
              key="connect"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              connect
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height:
            currentState === "initial" || currentState === "sent" ? 0 : "auto",
          opacity:
            currentState === "initial" || currentState === "sent" ? 0 : 1,
          scale:
            currentState === "initial" || currentState === "sent" ? 0.95 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 right-0"
      >
        <div className="flex flex-col gap-1 items-center justify-center bg-btn-bg rounded-xl p-2 border border-btn-stroke overflow-hidden">
          <AnimatePresence mode="wait">
            {currentState === "socials" && (
              <motion.div
                key="socials"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex gap-6 items-center justify-center bg-white rounded-lg py-2 px-4 border border-btn-stroke min-w-48">
                  {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={`/media/icons/${key}.svg`}
                        alt={key}
                        width={26}
                        height={26}
                        className="hover:scale-110 transition-all duration-300"
                      />
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentState("email")}
                  className="bg-[#0095FF] text-white px-9 py-1 rounded-lg font-medium hover:bg-[#0095FF]/80 transition-all duration-300 mt-1 w-full"
                >
                  write me
                </button>
              </motion.div>
            )}

            {currentState === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex flex-col gap-2 items-center justify-center bg-white rounded-lg py-2 px-4 border border-btn-stroke min-w-80  sm:min-w-96 text-gray-700">
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={emailData.email}
                    onChange={(e) =>
                      setEmailData({ ...emailData, email: e.target.value })
                    }
                    className="w-full active:outline-none focus:outline-none focus:ring-0"
                  />
                  <div className="w-full h-[1px] border-t-2 border-dashed border-gray-200"></div>
                  <textarea
                    placeholder="content"
                    name="message"
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    className="w-full resize-none active:outline-none focus:outline-none focus:ring-0 min-h-28"
                  ></textarea>

                  <div className="w-full h-[1px] border-t-2 border-dashed border-gray-200"></div>

                  <div className="flex items-center w-full justify-between py-1">
                    <button
                      onClick={() => setCurrentState("socials")}
                      className="bg-gray-500 text-white px-6 py-1 rounded-lg hover:bg-gray-400 transition-all duration-300"
                      disabled={isLoading}
                    >
                      back
                    </button>
                    <button
                      onClick={handleEmail}
                      disabled={isLoading}
                      className="bg-[#0095FF] text-white px-6 py-1 rounded-lg hover:bg-[#0095FF]/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>sending...</span>
                        </>
                      ) : (
                        "send"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
