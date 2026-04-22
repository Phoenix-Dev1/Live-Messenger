/**
 * ConversationBodySkeleton
 *
 * Drop-in loading skeleton for an open conversation's main content area.
 * Mimics the Header + scrollable message bubbles + input bar layout.
 */

import { SkeletonAvatar, SkeletonText, SkeletonBlock } from "@/app/components/skeleton/Skeleton";
import clsx from "clsx";

// A single message bubble — alternating sides to mimic real chat
const SkeletonBubble = ({ align = "left" }: { align?: "left" | "right" }) => (
  <div
    className={clsx(
      "flex items-end gap-2",
      align === "right" && "flex-row-reverse"
    )}
    aria-hidden
  >
    {align === "left" && <SkeletonAvatar size={32} />}
    <div
      className={clsx(
        "space-y-1 max-w-[60%]",
        align === "right" && "items-end flex flex-col"
      )}
    >
      <SkeletonBlock
        h={38}
        w={align === "right" ? 180 : 220}
        className="rounded-2xl"
      />
    </div>
  </div>
);

const ConversationBodySkeleton = () => (
  <div className="lg:pl-80 h-full" aria-hidden>
    <div className="h-full flex flex-col">

      {/* ── Header skeleton ───────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-ash-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <SkeletonAvatar size={40} />
        <div className="flex-1 space-y-1.5">
          <SkeletonText width="30%" height={14} />
          <SkeletonText width="18%" height={11} />
        </div>
      </div>

      {/* ── Message bubbles skeleton ──────────────────────── */}
      <div className="flex-1 overflow-hidden px-4 py-6 space-y-4 bg-slate-50">
        <SkeletonBubble align="left" />
        <SkeletonBubble align="right" />
        <SkeletonBubble align="left" />
        <SkeletonBubble align="left" />
        <SkeletonBubble align="right" />
        <SkeletonBubble align="right" />
        <SkeletonBubble align="left" />
      </div>

      {/* ── Input bar skeleton ────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-ash-200 bg-white">
        <SkeletonBlock h={40} className="flex-1 rounded-full" />
        <SkeletonBlock h={40} w={40} className="rounded-full shrink-0" />
      </div>

    </div>
  </div>
);

export default ConversationBodySkeleton;
