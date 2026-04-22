"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HiVideoCamera } from "react-icons/hi2";
import { toast } from "react-hot-toast";

const MeetingsClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onStartMeeting = () => {
    setIsLoading(true);
    axios.post("/api/daily/room")
      .then((response) => {
        const { name, url } = response.data;
        router.push(`/meeting/${name}?url=${encodeURIComponent(url)}`);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-sky-50 rounded-2xl text-sky-600">
            <HiVideoCamera size={48} />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Video Meetings
          </h2>
          <p className="text-neutral-500 text-lg leading-relaxed">
            Start a high-quality video conference with anyone. Simple, secure, and instant.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={onStartMeeting}
            disabled={isLoading}
            className="
              w-full 
              py-4 
              px-6 
              bg-sky-500 
              hover:bg-sky-600 
              text-white 
              text-lg 
              font-semibold 
              rounded-2xl 
              shadow-lg 
              shadow-sky-100 
              transition 
              active:scale-[0.98] 
              disabled:opacity-50 
              disabled:cursor-default
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <HiVideoCamera size={24} />
                Start a new meeting
              </>
            )}
          </button>
        </div>

        <div className="pt-8 border-t border-neutral-100">
          <div className="flex items-center justify-center gap-8 text-neutral-400">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest">Safe</span>
              <p className="text-[10px]">E2E Encrypted</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest">Fast</span>
              <p className="text-[10px]">Global Servers</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest">HD</span>
              <p className="text-[10px]">1080p Video</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsClient;
