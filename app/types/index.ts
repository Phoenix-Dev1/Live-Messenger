import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
  temporaryId?: string;
  updatedAt: Date;
};



export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
