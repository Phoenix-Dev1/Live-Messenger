"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import useRoutes from "@/app/hooks/useRoutes";

import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";
import { motion } from "framer-motion";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-20
          lg:bg-ash-950
          lg:flex
          lg:flex-col
          justify-between
          py-6
          border-r
          border-ash-900
        "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-4 w-full">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center pb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition border-2 border-transparent hover:border-forest-500 rounded-full p-[2px]"
          >
            <Avatar user={currentUser} />
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
};

export default DesktopSidebar;
