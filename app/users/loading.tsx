import UserListSkeleton from "@/app/components/skeleton/UserListSkeleton";
import EmptyStateSkeleton from "@/app/components/skeleton/EmptyStateSkeleton";
import Sidebar from "@/app/components/sidebar/Sidebar";

/**
 * /users loading.tsx
 *
 * Next.js will render this automatically while the layout awaits
 * the server-side data fetch (getUsers / getCurrentUser).
 *
 * It uses the real <Sidebar> shell so the outer chrome is stable,
 * and fills the two content zones with their dedicated skeletons.
 */
const Loading = () => (
  <Sidebar>
    <div className="h-full">
      <UserListSkeleton />
      {/* Main content area — only visible on lg+ (matches /users page.tsx) */}
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyStateSkeleton />
      </div>
    </div>
  </Sidebar>
);

export default Loading;
