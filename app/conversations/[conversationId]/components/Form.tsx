"use client";

import { useEffect } from "react";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto, HiXMark } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";

import MessageInput from "./MessageInput";
import useMessageStore from "@/app/hooks/useMessageStore";

interface FormProps {
  currentUser: User | null;
}

const Form: React.FC<FormProps> = ({ currentUser }) => {
  const { conversationId } = useConversation();
  const { addMessage, removeMessage, editingMessage, setEditingMessage, updateMessage } = useMessageStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const messageValue = watch("message");

  useEffect(() => {
    if (editingMessage) {
      setValue("message", editingMessage.body, { shouldValidate: true });
    } else {
      setValue("message", "");
    }
  }, [editingMessage, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const val = data.message;

    if (editingMessage) {
      axios.patch(`/api/messages/${editingMessage.id}`, {
        body: val
      })
      .then((response) => {
        updateMessage(response.data);
        setEditingMessage(null);
        setValue("message", "", { shouldValidate: true });
        toast.success("Message updated");
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.response?.data || "Failed to update message";
        toast.error(errorMessage);
      });

      return;
    }

    // HANDLE NEW MESSAGE
    setValue("message", "", { shouldValidate: true });

    if (!currentUser) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      id: tempId,
      body: val,
      image: null,
      createdAt: new Date(),
      seenIds: [],
      conversationId: conversationId,
      senderId: currentUser.id,
      sender: currentUser,
      seen: [],
    };

    addMessage(optimisticMessage as any);

    axios.post("/api/messages", {
      ...data,
      conversationId,
      temporaryId: tempId,
    })
    .catch(() => {
      removeMessage(tempId);
      toast.error("Something went wrong!");
      setValue("message", val);
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="relative">
      {editingMessage && (
        <div className="absolute bottom-full left-0 w-full bg-sky-50 border-t border-sky-100 py-2 px-4 flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Editing Message</span>
            <span className="text-xs text-gray-600 truncate max-w-[300px] italic">
              &quot;{editingMessage.body}&quot;
            </span>
          </div>
          <button 
            onClick={() => setEditingMessage(null)}
            className="text-gray-400 hover:text-gray-600 transition p-1"
          >
            <HiXMark size={20} />
          </button>
        </div>
      )}
      <div
        className="
          py-4
          px-4
          bg-white
          border-t
          flex
          items-center
          gap-2
          lg:gap-4
          w-full
        "
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset="ctcojbf8"
        >
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            value={messageValue}
            placeholder={editingMessage ? "Edit message" : "Write a message"}
          />
          <button
            type="submit"
            className="
              rounded-full
              p-2
              bg-sky-500
              cursor-pointer
              hover:bg-sky-600
              transition
              flex-shrink-0
            "
          >
            <HiPaperAirplane size={18} className="text-white rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;


