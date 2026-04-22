"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        relative
        flex
        flex-1
        justify-center
        p-4
        text-sm
        font-semibold
        transition-colors
        duration-300
        `,
        active ? "text-[#60a5fa]" : "text-slate-400 hover:text-white"
      )}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="relative z-10"
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      {active && (
        <motion.div
          layoutId="mobile-active-indicator"
          className="absolute top-0 inset-x-0 h-[2px] bg-[#3b82f6]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default MobileItem;
