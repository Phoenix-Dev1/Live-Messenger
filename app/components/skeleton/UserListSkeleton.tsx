/**
 * UserListSkeleton
 *
 * Drop-in loading skeleton for the /users sidebar panel.
 * Mimics the real UserList layout: a header row then grouped user rows.
 */

import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonBlock,
  SkeletonUserGroup,
} from "@/app/components/skeleton/Skeleton";

const UserListSkeleton = () => (
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
    <div className="px-5">
      {/* Header row */}
      <div className="flex justify-between items-center py-6">
        <SkeletonText width={110} height={22} className="rounded-md" />
        <SkeletonAvatar size={36} />
      </div>

      {/* Skeleton groups */}
      <SkeletonUserGroup rows={4} />
      <SkeletonUserGroup rows={3} />
      <SkeletonUserGroup rows={2} />
    </div>
  </aside>
);

export default UserListSkeleton;
