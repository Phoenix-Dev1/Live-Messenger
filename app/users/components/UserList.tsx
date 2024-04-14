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
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;
