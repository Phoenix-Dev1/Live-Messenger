"use client";

import { useEffect, useRef } from "react";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import useMessageStore from "@/app/hooks/useMessageStore";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const { messages, setMessages, addMessage, updateMessage, removeMessage } = useMessageStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, setMessages]);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      addMessage(message);

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      updateMessage(newMessage);
    };

    const deleteMessageHandler = (messageId: string) => {
      removeMessage(messageId);
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    pusherClient.bind("message:delete", deleteMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      pusherClient.unbind("message:delete", deleteMessageHandler);
    };
  }, [conversationId, addMessage, updateMessage, removeMessage]);


  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;

