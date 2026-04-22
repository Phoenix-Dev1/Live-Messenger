"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2";
import qs from "query-string";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        video: isVideo ? undefined : true,
      }
    }, { skipNull: true });

    router.push(url);
  };

  const Icon = isVideo ? HiVideoCameraSlash : HiVideoCamera;

  return (
    <button 
      onClick={onClick} 
      className="
        hover:opacity-75 
        transition 
        p-2 
        rounded-full 
        hover:bg-neutral-100
      "
      title={isVideo ? "End video call" : "Start video call"}
    >
      <Icon size={24} className="text-sky-500" />
    </button>
  );
};

export default ChatVideoButton;
