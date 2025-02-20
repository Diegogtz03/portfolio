import Timeline from "@/interfaces/about";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TimelineProps {
  timeline: Timeline[];
  setActiveTabIndex: (index: number) => void;
}

export default function TimelineSlider({
  timeline,
  setActiveTabIndex,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollLeft = containerRef.current.scrollLeft;
    const x = (e.clientX - rect.left + scrollLeft) * 0.4;
    setMouseX(x);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const scrollToSelected = (index: number) => {
    if (!containerRef.current) return;

    const offset = 80; // Match the offset used in render
    const tickSpacing = 50; // Match the spacing between timeline points
    const targetPosition = index * tickSpacing * 10; // 10px per tick

    // Calculate position to center the selected item
    const containerWidth = containerRef.current.clientWidth;
    const scrollPosition = targetPosition - containerWidth / 2 + offset * 10;

    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToSelected(selectedIndex);
  }, [selectedIndex]);

  return (
    <div className="flex flex-col gap-4 w-full h-20 items-center justify-center sm:mb-8 mb-0 overflow-y-visible">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10" />
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-visible  overflow-x-scroll no-scrollbar"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="flex flex-row min-w-max relative">
          {Array.from({ length: timeline.length * 45 + 160 }).map((_, i) => {
            // const offset = Math.floor(window.innerWidth / 16);
            const offset = 80;
            const isTimelinePoint = timeline.some(
              (item) => i - offset === item.id * 50
            );
            const timelineItem = timeline.find(
              (item) => i - offset === item.id * 50
            );
            const isSelected = timelineItem?.id === selectedIndex;

            return (
              <div
                key={`tick-${i}`}
                className="flex flex-col h-full items-center relative"
              >
                {isTimelinePoint && (
                  <div
                    className="absolute w-20 h-full cursor-pointer z-10"
                    onClick={() => {
                      if (timelineItem) {
                        setSelectedIndex(timelineItem.id);
                        setActiveTabIndex(timelineItem.id);
                      }
                    }}
                  />
                )}
                <div className="flex flex-col h-full items-center relative">
                  <motion.div
                    className="w-[2px] mx-1"
                    animate={{
                      height: isSelected
                        ? isHovering
                          ? 40
                          : 32
                        : isHovering && Math.abs(i * 4 - mouseX) < 20
                        ? 40 - (Math.abs(i * 4 - mouseX) / 20) * 8
                        : 32,
                      backgroundColor: isSelected
                        ? "#999999"
                        : isHovering && Math.abs(i * 4 - mouseX) < 20
                        ? "#D1D5DB"
                        : "#E5E7EB",
                      width: isSelected
                        ? "3px"
                        : isHovering && Math.abs(i * 4 - mouseX) < 20
                        ? "3px"
                        : "2px",
                    }}
                    whileHover={{
                      width: "3px",
                      backgroundColor: isSelected ? "#999999" : "#9CA3AF",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {isTimelinePoint && timelineItem && (
                    <motion.span
                      className={`mt-2 cursor-pointer select-none absolute h-full -bottom-full pt-2 ${
                        timelineItem.id === selectedIndex
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        if (timelineItem) {
                          setSelectedIndex(timelineItem.id);
                          setActiveTabIndex(timelineItem.id);
                        }
                      }}
                    >
                      {timelineItem.title}
                    </motion.span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
