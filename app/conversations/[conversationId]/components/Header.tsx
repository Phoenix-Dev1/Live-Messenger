"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  HiChevronLeft,
  HiEllipsisHorizontal,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import AvatarGroup from "@/app/components/AvatarGroup";

import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const onVideoCall = () => {
    setIsLoading(true);

    axios.post("/api/daily/room")
      .then((response) => {
        const { name, url } = response.data;
        // Redirect to the meeting page with the room name and encoded URL
        router.push(`/meeting/${name}?url=${encodeURIComponent(url)}`);
      })
      .catch(() => {
        toast.error("Failed to start video call");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
    bg-white
    w-full
    flex
    border-b-[1px]
    sm:px-4
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-sm
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
            "
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
          text-sm
          font-light
          text-neutral-500
          "
            >
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onVideoCall}
            disabled={isLoading}
            className="
              text-sky-500 
              hover:text-sky-600 
              transition 
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-default
            "
          >
            <HiOutlineVideoCamera size={28} />
          </button>
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className="
      text-sky-500
      cursor-pointer
      hover:text-sky-600
      transition
      "
          />
        </div>
      </div>
    </>
  );
};


export default Header;
