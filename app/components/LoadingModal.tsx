"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed
              inset-0
              bg-ash-50/80
              backdrop-blur-sm
              transition-opacity
            "
          />
        </Transition.Child>

        <div
          className="
            fixed
            inset-0
            z-10
            overflow-y-auto
          "
        >
          <div
            className="
            flex
            min-h-full
            items-center
            justify-center
            p-4
            text-center
          "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="text-[#3b82f6]"
                >
                  <CgSpinner size={48} />
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
