import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import MediaRoom from "@/app/components/MediaRoom";

interface IParams {
  conversationId: string;
}

interface ISearchParams {
  video?: boolean;
}

const ConversationId = async ({ 
  params,
  searchParams
}: { 
  params: IParams,
  searchParams: ISearchParams
}) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const currentUser = await getCurrentUser();

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        {searchParams.video ? (
          <MediaRoom 
            chatId={conversation.id}
            video={true}
            audio={true}
          />
        ) : (
          <>
            <Body initialMessages={messages} />
            <Form currentUser={currentUser} />
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationId;

