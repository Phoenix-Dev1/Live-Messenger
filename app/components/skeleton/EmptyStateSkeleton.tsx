/**
 * EmptyStateSkeleton
 *
 * Drop-in loading skeleton for the main content area of /users.
 * Mimics the real EmptyState layout: a large graphic block + two text lines.
 */

import { SkeletonBlock, SkeletonText } from "@/app/components/skeleton/Skeleton";

const EmptyStateSkeleton = () => (
  <div
    className="
      px-4 py-10 sm:px-6 lg:px-8
      h-full flex justify-center items-center
      bg-slate-50
    "
    aria-hidden
  >
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <SkeletonBlock h={220} w={260} className="rounded-2xl" />
      <SkeletonText width="65%" height={18} className="mt-2 rounded-md" />
      <SkeletonText width="45%" height={13} className="rounded-md" />
    </div>
  </div>
);

export default EmptyStateSkeleton;
