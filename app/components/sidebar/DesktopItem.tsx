"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} className="w-full relative group cursor-pointer">
      <Link
        href={href}
        className={clsx(
          `
          flex
          justify-center
          p-4
          text-sm
          font-semibold
          transition-all
          duration-300
          relative
          `,
          active ? "text-[#60a5fa]" : "text-slate-400 hover:text-white"
        )}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10"
        >
          <Icon className="h-6 w-6 shrink-0" />
        </motion.div>
        <span className="sr-only">{label}</span>
      </Link>
      {active && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-0 right-0 w-1 bg-[#3b82f6]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </li>
  );
};

export default DesktopItem;
