import ConversationBodySkeleton from "@/app/components/skeleton/ConversationBodySkeleton";

/**
 * /conversations/[conversationId] loading.tsx
 *
 * Shown while the page awaits getConversationById() and getMessages().
 * The ConversationBodySkeleton mirrors the Header → Body → Form layout
 * of the real page, preventing any layout shift on data arrival.
 */
const Loading = () => <ConversationBodySkeleton />;

export default Loading;
