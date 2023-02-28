"use client";

import { useMemo, useState } from "react";

import Header from "./Header";

import useHasMounted from "@/hooks/useHasMounted";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import getURL from "lib/getURL";

type Props = {
  posts: Post[];
};

export default function BlogLayout({ posts }: Props) {
  const [clicked, setClicked] = useState("");

  function handleClicked(image_ID: Base["_id"]) {
    if (clicked == image_ID) {
      setClicked("");
      return;
    }

    setClicked(image_ID);
  }

  // we want to generate two seperate layouts
  // for our 4 column and 3 column grids
  // so we memoize a seed for both BC width
  // is stateful and changes
  let [fourColLayoutSeed, threeColLayoutSeed] = useMemo(() => {
    return [Math.floor(Math.random() * 2) + 2, Math.floor(Math.random() * 4)];
  }, []);

  // use the width to switch between layouts
  // everytime we re-render the new width will
  // allow us to recreate the following array
  const { width, height } = useWindowDimensions();

  const assertScaledImg = posts.map((post, idx) => {
    // if display is huge
    if (width >= 1800) {
      // iterate over (0,1,2,3,4)
      fourColLayoutSeed = fourColLayoutSeed == 4 ? 0 : fourColLayoutSeed + 1;

      // only scale on the fourth value
      return fourColLayoutSeed == 4;

      // if display is regular laptop or PC
    } else if (width >= 1024) {
      // iterage over (0,1,2,3)
      threeColLayoutSeed = threeColLayoutSeed == 3 ? 0 : threeColLayoutSeed + 1;

      // Assert whether or not we're in third col
      // NOTE. 0 % 3 equals 0, so we have to add 1
      // otherwise we treat the first col like third
      const assertThirdCol = (idx + 1) % 3 == 0;

      // If third column cannot scale image or we
      // screw up the layout, must count down
      if (assertThirdCol && threeColLayoutSeed == 3) {
        threeColLayoutSeed = 2;
      }

      // only scale on the third value
      return threeColLayoutSeed == 3;

      // if display is small
    } else {
      return false;
    }
  });

  // becasue client logic alters the DOM,
  // we have to wait till after the first
  // render to reconcile changes
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Header title="How's it going?" />
      <div className="imgGrid">
        {posts.map((post, idx) => {
          return (
            <div
              key={post._id}
              className={assertScaledImg[idx] == true ? "scaledImg" : "normalImg"}
              onClick={() => handleClicked(post._id)}
            >
              <div className="imgFrame">
                <Image
                  className="object-cover object-center rounded"
                  src={getURL(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                  priority={assertScaledImg[idx]}
                  sizes="100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw"
                />

                {clicked === post._id && (
                  <AnimatePresence>
                    <motion.div
                      className="bg-black rounded h-full w-full top-0 left-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.65 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-white absolute top-6 left-0 p-5">
                        {post.categories[0].title}
                      </p>
                      <p
                        className={
                          assertScaledImg[idx]
                            ? "text-white absolute top-6 right-0 p-5"
                            : "text-white absolute top-[2.75rem] w-full left-0 p-5 text-ellipsis truncate"
                        }
                      >
                        {post.categories[0].description}
                      </p>
                      <p
                        className={
                          assertScaledImg[idx]
                            ? "text-white absolute top-[2.75rem] left-0 p-5"
                            : "text-white absolute top-16 left-0 p-5 "
                        }
                      >
                        {post.body[0].children[0].text}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
              <h1 className="text-white text-2xl absolute top-0 left-0 p-4">
                {post.title}
              </h1>
            </div>
          );
        })}
      </div>
    </>
  );
}
