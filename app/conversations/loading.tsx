import ConversationListSkeleton from "@/app/components/skeleton/ConversationListSkeleton";
import Sidebar from "@/app/components/sidebar/Sidebar";

/**
 * /conversations loading.tsx
 *
 * Shown while the layout awaits getConversations() / getUsers().
 * Renders the real Sidebar shell so outer chrome stays stable,
 * then fills the conversation list zone with its skeleton.
 */
const Loading = () => (
  <Sidebar>
    <div className="h-full">
      <ConversationListSkeleton />
    </div>
  </Sidebar>
);

export default Loading;
