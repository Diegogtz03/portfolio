import Image from "next/image";
import { useEffect, useRef } from "react";
import useMouseDistanceStore from "@/helper/mouseDistance";

export default function ShaderLogo({
  onHover,
  cursorClass,
}: {
  onHover: (hover: boolean) => void;
  cursorClass?: string;
}) {
  const targetRef = useRef<any>();
  const setDistance = useMouseDistanceStore((state) => state.setDistance);
  const setTargetRef = useMouseDistanceStore((state) => state.setTargetRef);
  const setMouseX = useMouseDistanceStore((state) => state.setX);
  const setMouseY = useMouseDistanceStore((state) => state.setY);

  useEffect(() => {
    setTargetRef(targetRef);

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;

        const dist = Math.sqrt(
          Math.pow(mouseX - targetCenterX, 2) +
            Math.pow(mouseY - targetCenterY, 2)
        );

        setDistance(Math.floor(dist));
        setMouseX(mouseX);
        setMouseY(mouseY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [setDistance, setTargetRef]);
  return (
    <Image
      ref={targetRef}
      src={"/media/logo.svg"}
      alt="logo"
      width={200}
      height={200}
      className={cursorClass}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    />
  );
}
