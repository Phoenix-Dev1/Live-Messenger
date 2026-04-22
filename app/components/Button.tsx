"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        items-center
        rounded-none
        px-4
        py-3
        text-sm
        font-bold
        uppercase
        tracking-widest
        transition-colors
        duration-200
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        `,
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth && "w-full",
        secondary ? "bg-ash-100 text-ash-900 hover:bg-ash-200 focus-visible:outline-ash-900" : "",
        danger ? "bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600" : "",
        !secondary && !danger ? "bg-[#3b82f6] text-white hover:bg-[#3b82f6] focus-visible:outline-[#3b82f6] shadow-xl shadow-[#3b82f6]/20" : ""
      )}
    >
      {children}
    </motion.button>
  );
};

export default Button;
