"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { motion } from "framer-motion";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  value?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  value,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="relative group">
      <label
        className={clsx(`
          block
          text-xs
          font-bold
          uppercase
          tracking-wider
          mb-1
          transition-colors
          duration-200
        `, errors[id] ? "text-rose-600" : "text-ash-500 group-focus-within:text-forest-600")}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            block
            w-full
            bg-transparent
            border-0
            border-b-2
            px-0
            py-2
            text-ash-900
            font-medium
            placeholder:text-ash-300
            focus:ring-0
            transition-colors
            duration-200
            sm:text-sm
            sm:leading-6
            `,
            errors[id] ? "border-rose-600 focus:border-rose-600" : "border-ash-200 focus:border-forest-600 hover:border-ash-400",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      {errors[id] && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-rose-600 text-xs font-medium mt-1 absolute"
        >
          This field is required
        </motion.p>
      )}
    </div>
  );
};

export default Input;
