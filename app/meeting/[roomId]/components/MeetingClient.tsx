"use client";

import { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import { useRouter } from "next/navigation";
import { HiXMark } from "react-icons/hi2";

import { useSearchParams } from "next/navigation";

interface MeetingClientProps {
  roomId: string;
}

const MeetingClient: React.FC<MeetingClientProps> = ({ roomId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const callFrameRef = useRef<any>(null);
  const [isJoined, setIsJoined] = useState(false);

  const urlFromParams = searchParams.get("url");
  const roomUrl = urlFromParams || `https://live-messenger.daily.co/${roomId}`;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || callFrameRef.current) return;

    // Security Check: WebRTC requires HTTPS on mobile
    const isSecure = window.isSecureContext || window.location.protocol === "https:";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isSecure && isMobile) {
      setError("Mobile browsers require HTTPS for video calls. Please use a secure link (like Ngrok or Vercel).");
      return;
    }

    console.log("Connecting to:", roomUrl);

    // Using createFrame for standard integration
    const frame = DailyIframe.createFrame(containerRef.current, {
      iframeStyle: {
        width: "100%",
        height: "100%",
        border: "0",
        borderRadius: "12px",
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    });

    callFrameRef.current = frame;

    frame.join({ url: roomUrl }).catch((err: any) => {
      console.error("Daily Join Error:", err);
      setError("Failed to connect. Please ensure your Daily.co room is active.");
    });

    frame.on("joined-meeting", () => {
      setIsJoined(true);
      setError(null);
    });

    frame.on("left-meeting", () => {
      // Only go back if we actually joined successfully before
      if (isJoined) {
        router.push("/meetings");
      }
    });

    frame.on("error", (event: any) => {
      console.error("Daily error event:", event);
      setError(event?.errorMsg || "A video connection error occurred");
    });

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
      }
    };
  }, [roomId, router, roomUrl, isJoined]);

  return (
    <div className="flex flex-col h-full bg-neutral-950 p-4 md:p-8">
      {/* SaaS Style Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Video Conference
          </h1>
          <p className="text-sm text-neutral-400">
            Room ID: <span className="font-mono text-sky-400">{roomId}</span>
          </p>
        </div>
        <button
          onClick={() => router.push("/meetings")}
          className="
            p-2 
            rounded-full 
            bg-neutral-800 
            text-neutral-400 
            hover:text-white 
            hover:bg-neutral-700 
            transition
          "
        >
          <HiXMark size={24} />
        </button>
      </div>

      {/* Video Container */}
      <div 
        className="
          flex-1 
          relative 
          rounded-2xl 
          overflow-hidden 
          bg-neutral-900 
          border 
          border-neutral-800 
          shadow-2xl
        "
      >
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="flex flex-col items-center gap-4 max-w-sm">
              <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                <HiXMark size={32} />
              </div>
              <h3 className="text-white font-semibold text-lg">Connection Failed</h3>
              <p className="text-neutral-400 text-sm">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : !isJoined ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-neutral-400 font-medium tracking-wide">Initializing secure link...</p>
            </div>
          </div>
        ) : null}
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* Footer Branding/Info */}
      <div className="mt-6 flex justify-center">
        <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
          Powered by Daily.co • End-to-End Encrypted
        </p>
      </div>
    </div>
  );
};

export default MeetingClient;
