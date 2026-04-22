import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
  temporaryId?: string;
};


export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
