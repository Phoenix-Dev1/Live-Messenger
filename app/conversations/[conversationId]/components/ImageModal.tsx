"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
  isOwn?: boolean;
  onDelete?: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  src,
  isOwn,
  onDelete
}) => {
  if (!src) {
    return null;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform transition-all w-full max-w-5xl flex items-center justify-center">
                {/* Mobile Top Bar / Desktop Floating Actions */}
                <div 
                  className="
                    fixed 
                    top-0 
                    left-0 
                    right-0 
                    z-50 
                    flex 
                    items-center 
                    justify-between 
                    p-4 
                    md:bg-transparent 
                    bg-gradient-to-b 
                    from-black/60 
                    to-transparent
                  "
                >
                  {/* We use a flex-row-reverse for Desktop to keep them on the right, but split them for Mobile */}
                  <div className="flex items-center gap-2 md:fixed md:top-4 md:right-4 md:bg-transparent">
                    {isOwn && onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete();
                        }}
                        className="
                          p-3
                          md:p-2 
                          text-white 
                          transition 
                          bg-black/40
                          md:bg-white/10 
                          hover:bg-black/60
                          md:hover:bg-white/20 
                          rounded-full
                        "
                      >
                        <HiTrash className="h-6 w-6 md:h-7 md:w-7" />
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="
                        p-3
                        md:p-2 
                        text-white 
                        transition 
                        bg-black/40
                        md:bg-white/10 
                        hover:bg-black/60
                        md:hover:bg-white/20 
                        rounded-full
                      "
                    >
                      <IoClose className="h-7 w-7 md:h-8 md:w-8" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full max-h-[85vh] flex justify-center mt-12 md:mt-0">
                  <Image
                    alt="Image"
                    className="object-contain w-auto h-auto max-w-full max-h-[85vh] rounded-md shadow-2xl"
                    src={src}
                    width={1200}
                    height={1200}
                  />
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};


export default ImageModal;

