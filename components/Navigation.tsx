"use client"

import { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";

const menu_li = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    }
  }
};

const menu = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.75 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const nav = {
  open: {
    y: 0,
    transition: {
      duration: 0.8
    }
  },
  closed: {
    y: -1500,
    transition: {
      duration: 0.8
    }
  }
};

interface PathProps {
  d?: string
  transition?: {
    duration: number
  }
  variants: {
    closed: { d: string } | { opacity: number };
    open: { d: string } | { opacity: number };
  };
}

interface MenuToggleProps {
  toggle: () => void;
}

interface MenuItemProps {
  link: string;
  toggle: () => void;
}

function Path(props: PathProps) {
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

function MenuToggle({ toggle }: MenuToggleProps) {
  return (
    <button onClick={toggle} className="absolute top-0 right-0 p-6 z-10 cursor-auto">
      <svg className="cursor-pointer" viewBox="0 0 22 20">
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

function MenuItem({ link, toggle }: MenuItemProps) {
  return (
    <motion.div
      className="mt-4 text-center z-10"
      variants={menu_li}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className="text-white text-2xl" onClick={toggle} href={link}>{link.slice(1) || "home"}</Link>
    </motion.div>
  )
}

const items = ['/', '/about']

function Navigation({ toggle }: MenuToggleProps) {
  return (
    <motion.ul variants={menu} className="absolute top-20 w-full">
      {items.map((item, idx) => {
        return <MenuItem toggle={toggle} link={item} key={idx} />
      })}
    </motion.ul>
  )
}

export default function SideBar() {
  const [isOpen, toggleOpen] = useState(false)

  function handleToggle() {
    return toggleOpen(!isOpen)
  }

  return (
    <motion.nav initial={false} animate={isOpen ? "open" : "closed"} className={isOpen ? "menu" : "menu h-0"}>
      <MenuToggle toggle={handleToggle} />
      <motion.div className="w-full mx-auto bg-slate-800/80 h-screen" variants={nav}></motion.div>
      <Navigation toggle={handleToggle} />

    </motion.nav>
  );
}

