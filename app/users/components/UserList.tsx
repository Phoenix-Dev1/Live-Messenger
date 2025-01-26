"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import Avatar from "@/app/components/Avatar";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface UserListProps {
  items: User[];
  currentUser: User;
}

const UserList: React.FC<UserListProps> = ({ items, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group users alphabetically and by non-alphabetical characters
  const groupedUsers: Record<string, User[]> = items.reduce((acc, user) => {
    const firstChar = user.name?.[0]?.toUpperCase() || "#"; // Get the first character
    if (/^[A-Z]$/.test(firstChar)) {
      // Check if it's an alphabet character
      acc[firstChar] = acc[firstChar] || [];
      acc[firstChar].push(user);
    } else {
      // Group non-alphabetical users under "#"
      acc["#"] = acc["#"] || [];
      acc["#"].push(user);
    }
    return acc;
  }, {} as Record<string, User[]>);

  // Sort the groups alphabetically
  const sortedKeys = Object.keys(groupedUsers).sort((a, b) => {
    if (a === "#") return 1; // Put "#" at the end
    if (b === "#") return -1;
    return a.localeCompare(b);
  });

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className="
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
          block
          w-full
          left-0
        "
      >
        <div className="px-5">
          <div className="flex-col">
            <div className="flex justify-between items-center">
              <div
                className="
                  text-2xl
                  font-bold
                  text-neutral-800
                  py-4
                "
              >
                Users & Settings
              </div>
              <div
                onClick={() => setIsModalOpen(true)}
                className="
                  cursor-pointer
                  hover:opacity-75
                  transition
                "
              >
                <Avatar user={currentUser} />
              </div>
            </div>
          </div>

          {/* Render grouped users */}
          {sortedKeys.map((key) => (
            <div key={key} className="mb-6">
              <div className="text-lg font-bold text-gray-700 mb-2">{key}</div>
              <div className="space-y-2">
                <div className="h-[1px] w-[90%] m-auto bg-gray-500 my-4"></div>
                {groupedUsers[key].map((user) => (
                  <UserBox key={user.id} data={user} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;
