import { create } from "zustand";
import { FullMessageType } from "@/app/types";

interface MessageStore {
  messages: FullMessageType[];
  editingMessage: FullMessageType | null;
  setMessages: (messages: FullMessageType[]) => void;
  addMessage: (message: FullMessageType) => void;
  removeMessage: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  updateMessage: (message: FullMessageType) => void;
  setEditingMessage: (message: FullMessageType | null) => void;
}


const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  editingMessage: null,
  setMessages: (messages) => set({ messages }),
  setEditingMessage: (message) => set({ editingMessage: message }),
  addMessage: (message) =>
    set((state) => {
      // 1. Check if the incoming message has a temporaryId that matches an existing one
      const tempId = message.temporaryId;
      if (tempId) {

        const index = state.messages.findIndex((m) => m.id === tempId);
        if (index !== -1) {
          const newMessages = [...state.messages];
          newMessages[index] = message;
          return { messages: newMessages };
        }
      }

      // 2. Avoid duplicates if the message was already added (by real ID)
      if (state.messages.find((m) => m.id === message.id)) {
        return state;
      }

      return { messages: [...state.messages, message] };
    }),
  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== messageId),
    })),
  updateMessage: (newMessage) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === newMessage.id ? newMessage : m
      ),
    })),
}));


export default useMessageStore;
