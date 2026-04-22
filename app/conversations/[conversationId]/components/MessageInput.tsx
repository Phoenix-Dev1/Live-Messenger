"use client";

import { useEffect, useRef } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  required,
  register,
  value,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, onChange, ...rest } = register(id, { required });

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "inherit";
      const computed = window.getComputedStyle(textarea);
      const height = textarea.scrollHeight + 
                     parseInt(computed.getPropertyValue("border-top-width")) + 
                     parseInt(computed.getPropertyValue("border-bottom-width"));
      
      textarea.style.height = `${Math.min(height, 150)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="relative w-full">
      <textarea
        dir="auto"
        id={id}
        {...rest}
        onChange={(e) => {
          onChange(e);
          adjustHeight();
        }}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        placeholder={placeholder}
        rows={1}
        className="
          text-black
          font-light
          py-2.5
          px-4
          bg-neutral-100
          w-full
          rounded-3xl
          focus:outline-none
          resize-none
          overflow-y-auto
          max-h-[150px]
          leading-normal
          transition-all
          block
        "
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
      />
    </div>
  );
};

export default MessageInput;
