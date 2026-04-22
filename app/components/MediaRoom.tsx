"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isJoined, setIsJoined] = useState(false);

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

  const handleJoin = async () => {
    try {
      // Force request both with specific mobile-friendly constraints
      await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { facingMode: 'user' } 
      });
      setIsJoined(true);
    } catch (e: any) {
      console.error("Permission error:", e);
      if (e.name === "NotAllowedError") {
        alert("Camera or Microphone access was denied. Please check: \n1. Settings > Safari > Camera/Microphone (Set to 'Allow')\n2. Settings > Privacy > Camera (Ensure Safari is enabled)\n3. Check if another app is currently using the camera.");
      } else {
        alert(`Media access error: ${e.name}. Please ensure you are using HTTPS and have camera/mic enabled.`);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !window.isSecureContext) {
      console.error("[LIVEKIT] Media access requires a secure context (HTTPS or localhost). Mobile testing requires HTTPS.");
    }
  }, []);

  useEffect(() => {
    if (isJoined) {
      const startTime = Date.now();
      
      // Log join event
      axios.post('/api/messages', {
        message: `${name} joined the video call`,
        conversationId: chatId,
        isSystem: true
      });

      return () => {
        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000);
        
        if (duration < 1) return; // Don't log extremely short sessions

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

        axios.post('/api/messages', {
          message: `${name} was in the call for ${durationStr}`,
          conversationId: chatId,
          isSystem: true
        });
      };
    }
  }, [isJoined, chatId, name]);

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
      <div className="flex flex-col flex-1 justify-center items-center h-full bg-neutral-900 min-h-[400px]">
        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Ready to join?</h2>
          <p className="text-neutral-400 text-sm mb-8">Your camera and mic will be requested.</p>
          <button 
            onClick={handleJoin}
            className="px-10 py-3.5 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all active:scale-95 shadow-xl shadow-sky-500/20"
          >
            Join Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isJoined ? (
        <motion.div 
          key="join-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex flex-col flex-1 justify-center items-center h-full bg-neutral-900 min-h-[400px]"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 flex flex-col items-center shadow-2xl"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0px rgba(14, 165, 233, 0)",
                  "0 0 0 15px rgba(14, 165, 233, 0.1)",
                  "0 0 0 0px rgba(14, 165, 233, 0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-sky-500/40"
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </motion.div>
            
            <h2 className="text-white text-2xl font-bold mb-3 tracking-tight">Ready to connect?</h2>
            <p className="text-neutral-300 text-sm mb-10 text-center max-w-[200px] leading-relaxed">
              Step into the video room. Your camera and mic will be requested.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoin}
              className="px-12 py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-400 transition-colors shadow-xl shadow-sky-500/25 text-lg"
            >
              Join Call
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="room"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="flex-1 overflow-hidden relative bg-black flex flex-col h-full w-full"
        >
          <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={true}
            audio={true}
            onDisconnected={() => {
              router.push(window.location.pathname);
            }}
            onMediaDeviceError={(e) => {
              console.error("Media Device Error:", e);
              alert(`Device Error: ${e.message}`);
            }}
            options={{
              publishDefaults: {
                videoCodec: 'h264',
              },
            }}
            className="h-full w-full flex flex-col"
          >
            <VideoConference screenShare={false} />
          </LiveKitRoom>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaRoom;
