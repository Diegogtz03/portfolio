"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Folder from "./Folders";
import Media from "./Media";

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  title?: string;
  link: string;
  component: React.ReactNode;
}

interface LinkItem {
  title: string;
  link: string;
}

interface MediaItem {
  link: string;
  isVideo: boolean;
}

const links: LinkItem[] = [
  {
    title: "projects",
    link: "/projects",
  },
  {
    title: "about",
    link: "/about",
  },
  {
    title: "experience",
    link: "/experience",
  },
  {
    title: "fun",
    link: "/fun",
  },
];

const media: MediaItem[] = [
  {
    link: "design.mp4",
    isVideo: true,
  },
  {
    link: "pic1.JPG",
    isVideo: false,
  },
  {
    link: "pic2.JPG",
    isVideo: false,
  },
  {
    link: "pic3.JPG",
    isVideo: false,
  },
  {
    link: "pic4.JPG",
    isVideo: false,
  },
  {
    link: "pic5.JPG",
    isVideo: false,
  },
];

export default function FloatingItems({ containerRef }: { containerRef: any }) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  const getRandomHeight = () => {
    return (
      window.innerHeight && Math.random() * (window.innerHeight - 100 - 20) + 20
    );
  };

  const getRandomWidth = () => {
    return (
      window.innerWidth && Math.random() * (window.innerWidth - 100 - 20) + 20
    );
  };

  useEffect(() => {
    let finalItems: FloatingItem[] = [];

    media.forEach((mediaItem, i) => {
      let x = getRandomWidth();
      let y = getRandomHeight();

      let item: FloatingItem = {
        id: i,
        x: x,
        y: y,
        velocityX: 0,
        velocityY: 0,
        link: mediaItem.link,
        component: <Media url={mediaItem.link} isVideo={mediaItem.isVideo} />,
      };

      finalItems.push(item);
    });

    links.forEach((link, i) => {
      let x = getRandomWidth();
      let y = getRandomHeight();

      // try to avoid the middle square
      const middleSquareEstWidth = 100;

      if (
        x < window.innerWidth / 2 - middleSquareEstWidth ||
        x > window.innerWidth / 2 - middleSquareEstWidth
      ) {
        x += 20;
      }

      let velocityX = Math.random() * (20 + 20) - 20;
      let velocityY = Math.random() * (20 + 20) - 20;

      let item: FloatingItem = {
        id: i,
        x: x,
        y: y,
        velocityX: velocityX,
        velocityY: velocityY,
        title: link.title,
        link: link.link,
        component: <Folder title={link.title} link={link.link} />,
      };

      finalItems.push(item);
    });

    setItems(finalItems);
  }, []);

  return (
    <div className="h-screen w-screen absolute top-10 left-0 z-10 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileDrag={{ scale: 1.02 }}
          initial={{
            bottom: item.y.toString() + "px",
            right: item.x.toString() + "px",
          }}
          className={`w-fit h-fit p-1 z-20 hover:cursor-grab active:cursor-grabbing absolute`}
          drag
          dragConstraints={containerRef}
        >
          {item.component}
        </motion.div>
      ))}
    </div>
  );
}
