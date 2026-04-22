"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
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
  const { addMessage, removeMessage } = useMessageStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const messageValue = data.message;
    setValue("message", "", { shouldValidate: true });

    if (!currentUser) {
      return;
    }

    // Create a temporary ID for the optimistic message
    const tempId = `temp-${Date.now()}`;

    // Create the optimistic message object
    const optimisticMessage = {
      id: tempId,
      body: messageValue,
      image: null,
      createdAt: new Date(),
      seenIds: [],
      conversationId: conversationId,
      senderId: currentUser.id,
      sender: currentUser,
      seen: [],
    };

    // Add to store immediately
    addMessage(optimisticMessage as any);

    axios
      .post("/api/messages", {
        ...data,
        conversationId,
        temporaryId: tempId,
      })

      .catch(() => {
        // If it fails, remove the optimistic message and alert the user
        removeMessage(tempId);
        toast.error("Something went wrong!");
        // Optional: restore the message to the input so the user can try again
        setValue("message", messageValue);
      });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
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
          placeholder="Write a message"
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
          "
        >
          <HiPaperAirplane size={18} className="text-white rotate-180" />
        </button>
      </form>
    </div>
  );
};

export default Form;

