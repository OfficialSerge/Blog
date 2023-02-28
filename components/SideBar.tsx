"use client"

import { useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import useHasMounted from "@/hooks/useHasMounted";

import Link from "next/link";

const menu_li = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const menu = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const desktop = {
  open: {
    width: "200px",
    transition: {
      zIndex: 1,
      type: "spring",
      stiffness: 100,
      restDelta: 2,
    }
  },
  closed: {
    width: "0px",
    transition: {
      zIndex: 0,
      type: "spring",
      stiffness: 500,
      damping: 70
    }
  }
};

const mobile = {
  open: {
    height: '100px',
    transition: {
      zIndex: 1,
      type: "spring",
      stiffness: 100,
      restDelta: 2,
    }
  },
  closed: {
    height: '0px',
    transition: {
      zIndex: 0,
      type: "spring",
      stiffness: 100,
      restDelta: 2,
    }
  },
};


function Path(props) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="white"
      strokeLinecap="round"
      {...props}
    />
  );
}

function MenuToggle({ toggle }) {
  return (
    <button onClick={toggle} className="w-full">
      <svg className="ml-auto lg:ml-0" viewBox="0 0 22 20">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }} />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }} />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }} />
      </svg>
    </button>
  );
}

function MenuItem({ link, toggle }) {
  return (
    <motion.div
      className="mt-4 text-end lg:text-left"
      variants={menu_li}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className="text-white text-xl 3xl:text-2xl" onClick={toggle} href={link}>{link.slice(1) || "home"}</Link>
    </motion.div>
  )
}

const items = ['/', '/about']

function Navigation({ toggle }) {
  return (
    <motion.ul variants={menu} className="w-full mx-auto">
      {items.map((item, idx) => {
        return <MenuItem toggle={toggle} link={item} key={idx} />
      })}
    </motion.ul>
  )
}

export default function SideBar() {
  const [isOpen, toggleOpen] = useState(false)

  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [0, 100],
    ["#7700ff", "rgb(230, 255, 0)"]
  )

  const { width, height } = useWindowDimensions();
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  function handleToggle() {
    return toggleOpen(!isOpen)
  }

  return (
    <motion.nav initial={false} style={{ x, background }}  animate={isOpen ? "open" : "closed"} className={width >= 1024 ? "normalMenu" : "mobileMenu"}>
      <MenuToggle toggle={handleToggle} />
      <motion.div custom={width} variants={width >= 1024 ? desktop : mobile}>
        <Navigation toggle={handleToggle} />
      </motion.div>
    </motion.nav>
  );
}

