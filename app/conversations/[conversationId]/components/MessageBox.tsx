"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import ImageModal from "./ImageModal";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-hot-toast";
import useMessageStore from "@/app/hooks/useMessageStore";
import DeleteMessageModal from "./DeleteMessageModal";

const EDIT_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { removeMessage, setEditingMessage } = useMessageStore();

  const [isExpired, setIsExpired] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const canEdit = useMemo(() => {
    if (!isOwn || !!data.image || isExpired) return false;
    const createdAt = new Date(data.createdAt).getTime();
    const now = new Date().getTime();
    return now - createdAt < EDIT_TIME_LIMIT;
  }, [isOwn, data.createdAt, data.image, isExpired]);

  useEffect(() => {
    if (!isOwn || !!data.image) return;

    const createdAt = new Date(data.createdAt).getTime();
    const expiryTime = createdAt + EDIT_TIME_LIMIT;
    const now = new Date().getTime();
    const timeLeft = expiryTime - now;

    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsExpired(true);
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [isOwn, data.createdAt, data.image]);

  const isEdited = useMemo(() => {
    if (!data.updatedAt || !data.createdAt) return false;
    return new Date(data.updatedAt).getTime() - new Date(data.createdAt).getTime() > 1000;
  }, [data.updatedAt, data.createdAt]);

  // AUTO-HIDE AFTER 3 SECONDS
  useEffect(() => {
    if (!showActions) return;

    const timer = setTimeout(() => {
      setShowActions(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showActions]);

  // HIDE WHEN CLICKING OUTSIDE
  useEffect(() => {
    if (!showActions) return;

    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showActions]);


  const container = clsx("flex gap-3 p-4 group", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit max-w-[95%] md:max-w-[90%] overflow-hidden cursor-pointer",
    isOwn ? "bg-sky-500 text-white rounded-2xl rounded-br-none" : "bg-gray-100 rounded-2xl rounded-bl-none",
    data.image ? "p-0" : "py-2 px-4"
  );

  const handleDelete = () => {
    if (isLoading) return;
    setIsLoading(true);
    axios
      .delete(`/api/messages/${data.id}`)
      .then(() => {
        setIsDeleteModalOpen(false);
        removeMessage(data.id);
        toast.success("Message deleted");
      })
      .catch(() => toast.error("Failed to delete message"))
      .finally(() => setIsLoading(false));
  };

  if (data.isSystem) {
    return (
      <div className="flex justify-center w-full my-4">
        <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[11px] px-4 py-1.5 rounded-full font-medium shadow-sm border border-neutral-200/50 uppercase tracking-wider">
          {data.body}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={container}>
      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
        </div>
        <div className="flex items-center gap-2">
          {isOwn && (
            <div 
              className={clsx(
                "flex items-center gap-2 transition-all duration-200 flex-shrink-0",
                showActions ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
              )}
            >
              {canEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingMessage(data);
                  }}
                  className="text-gray-400 hover:text-sky-500 transition cursor-pointer"
                >
                  <HiPencilSquare size={16} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
                disabled={isLoading}
                className="text-gray-400 hover:text-red-500 transition cursor-pointer disabled:cursor-default"
              >
                <HiTrash size={16} />
              </button>
            </div>
          )}
          <div 
            onClick={() => isOwn && setShowActions(!showActions)}
            className={clsx(message, "relative group/msg")}
          >
            <ImageModal
              src={data.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
              isOwn={isOwn}
              onDelete={() => setIsDeleteModalOpen(true)}
            />
            {data.image ? (
              <div className="relative">
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageModalOpen(true);
                  }}
                  alt="Image"
                  height={288}
                  width={288}
                  src={data.image}
                  className="object-cover cursor-pointer hover:scale-105 transition translate"
                />
                {/* Time overlay for images */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm whitespace-nowrap">
                  <span className="text-[10px] text-white/90">
                    {format(new Date(data.createdAt), "p")}
                  </span>
                  {isEdited && (
                    <span className="text-[9px] text-white/60">edited</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col min-w-[75px]">
                <div dir="auto" className="break-words leading-normal pr-2">
                  {data.body}
                </div>
                <div className={clsx(
                  "flex items-center justify-end gap-1.5 mt-1 ml-auto whitespace-nowrap",
                  isOwn ? "text-white/80" : "text-gray-500"
                )}>
                  <span className="text-[10px] font-medium">
                    {format(new Date(data.createdAt), "p")}
                  </span>
                  {isEdited && (
                    <span className="text-[9px] opacity-70 italic">
                      edited
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};


export default MessageBox;


