/**
 * Skeleton — Core reusable primitive components
 *
 * Usage:
 *   import { SkeletonAvatar, SkeletonText, SkeletonBlock } from "@/app/components/skeleton/Skeleton";
 *
 *   <SkeletonAvatar />          → circular avatar placeholder
 *   <SkeletonText width="60%" />→ single text-line placeholder
 *   <SkeletonBlock h={120} />   → rectangular block placeholder
 *   <SkeletonUserRow />         → pre-composed avatar + text row
 */

import clsx from "clsx";

// ─── Base shimmer class ───────────────────────────────────────────────────────
const base =
  "animate-[shimmer_1.6s_ease-in-out_infinite] bg-[length:400%_100%]" +
  " bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded";

// ─── Primitives ───────────────────────────────────────────────────────────────

interface SkeletonAvatarProps {
  size?: number;
  className?: string;
}

export const SkeletonAvatar = ({ size = 40, className }: SkeletonAvatarProps) => (
  <div
    className={clsx(base, "shrink-0 rounded-full", className)}
    style={{ width: size, height: size }}
    aria-hidden
  />
);

interface SkeletonTextProps {
  width?: string | number;
  height?: number;
  className?: string;
}

export const SkeletonText = ({
  width = "100%",
  height = 14,
  className,
}: SkeletonTextProps) => (
  <div
    className={clsx(base, "rounded-md", className)}
    style={{ width, height }}
    aria-hidden
  />
);

interface SkeletonBlockProps {
  h?: number | string;
  w?: number | string;
  className?: string;
}

export const SkeletonBlock = ({
  h = 120,
  w = "100%",
  className,
}: SkeletonBlockProps) => (
  <div
    className={clsx(base, "rounded-xl", className)}
    style={{ height: h, width: w }}
    aria-hidden
  />
);

// ─── Composed patterns ────────────────────────────────────────────────────────

/** One user row: avatar circle + short name bar */
export const SkeletonUserRow = ({ className }: { className?: string }) => (
  <div className={clsx("flex items-center gap-3 px-3 py-3", className)} aria-hidden>
    <SkeletonAvatar size={36} />
    <SkeletonText width="55%" height={13} />
  </div>
);

/** Section divider label + rows */
interface SkeletonUserGroupProps {
  rows?: number;
}

export const SkeletonUserGroup = ({ rows = 3 }: SkeletonUserGroupProps) => (
  <div className="mb-8" aria-hidden>
    {/* letter label */}
    <div className="flex items-center gap-4 mb-3 px-3">
      <SkeletonText width={12} height={10} className="rounded" />
      <div className="h-px bg-slate-100 flex-1" />
    </div>
    <div className="space-y-1">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonUserRow key={i} />
      ))}
    </div>
  </div>
);
