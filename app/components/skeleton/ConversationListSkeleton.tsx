/**
 * ConversationListSkeleton
 *
 * Drop-in loading skeleton for the /conversations sidebar panel.
 * Mimics the ConversationList layout: header row + a list of
 * conversation rows (avatar + name + last-message snippet + timestamp).
 */

import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonBlock,
} from "@/app/components/skeleton/Skeleton";

// One conversation row skeleton
const SkeletonConversationRow = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl" aria-hidden>
    <SkeletonAvatar size={44} />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="flex justify-between items-center">
        <SkeletonText width="42%" height={13} />
        <SkeletonText width={32} height={11} />
      </div>
      <SkeletonText width="68%" height={12} />
    </div>
  </div>
);

const ConversationListSkeleton = () => (
  <aside
    className="
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-ash-200
      bg-white/80
      backdrop-blur-xl
      block
      w-full
      left-0
      shadow-sm
    "
    aria-hidden
  >
    <div className="px-4">
      {/* Header */}
      <div className="flex justify-between items-center py-6 px-1">
        <SkeletonText width={120} height={22} className="rounded-md" />
        {/* compose icon placeholder */}
        <SkeletonBlock h={28} w={28} className="rounded-lg" />
      </div>

      {/* Conversation rows */}
      <div className="space-y-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonConversationRow key={i} />
        ))}
      </div>
    </div>
  </aside>
);

export default ConversationListSkeleton;
