"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio
}: MediaRoomProps) => {
  const session = useSession();
  const [token, setToken] = useState("");

  const name = session.data?.user?.name || "User";

  useEffect(() => {
    if (!name || name === "User") return;

    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error("LIVEKIT_ERROR", e);
      }
    })();
  }, [name, chatId]);

  const router = useRouter();

  const [isJoined, setIsJoined] = useState(false);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-full min-h-[400px]">
        <BeatLoader color="#3b82f6" />
        <p className="text-sm text-neutral-500 mt-4 font-medium">
          Fetching token...
        </p>
      </div>
    );
  }

  if (!isJoined) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-full bg-neutral-900">
        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Ready to join?</h2>
          <p className="text-neutral-400 text-sm mb-8">Your camera and mic will be requested.</p>
          <button 
            onClick={() => setIsJoined(true)}
            className="px-10 py-3.5 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all active:scale-95 shadow-xl shadow-sky-500/20"
          >
            Join Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden relative bg-black">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => {
          router.push(window.location.pathname);
        }}
        className="h-full w-full"
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

export default MediaRoom;
