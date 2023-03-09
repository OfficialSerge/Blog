"use client";

import { useState } from "react";
import Image from "next/image";
import getURL from "@/lib/getURL";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction < 0 ? -1000 : 1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

export default function Card({ link, posts }: { link: string; posts: Post[] }) {
  const [[page, direction], setPage] = useState([0, 0]);

  function paginate(newDirection: number) {
    const newPage = (page + newDirection) >= 0 ? (page + newDirection) % posts.length : posts.length - 1
    setPage([newPage, newDirection]);
  }

  return (
    <div className="relative h-64 w-full md:row-span-2 lg:h-96 3xl:w-10/12 mx-auto">
      <AnimatePresence initial={false}>
        <motion.div
          className="absolute w-full h-full"
          key={page}
          variants={variants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <Image
            className="object-cover object-center rounded"
            src={getURL(posts[page].mainImage).url()}
            priority
            alt=""
            fill
            sizes="100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw"
          />

        </motion.div>
      </AnimatePresence>

      <div className="absolute right-0 top-1/2 z-10 cursor-pointer" onClick={() => paginate(1)}>
        <svg className="rotate-90 opacity-25" xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 400 512">
          <path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      </div>
      <div className="absolute top-1/2 z-10 cursor-pointer" onClick={() => paginate(-1)}>
        <svg className="-rotate-90 opacity-25" xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 400 512">
          <path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      </div>
    </div >
  );
}
