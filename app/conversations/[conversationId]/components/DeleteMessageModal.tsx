"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteMessageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            sm:mx-0
            sm:h-10
            sm:w-10
          "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div
          className="
            mt-3
            text-center
            sm:ml-4
            sm:mt-0
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="
              text-base
              font-semibold
              leading-6
              text-gray-900
            "
          >
            Delete Message
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this message? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div
        className="
          mt-5
          sm:mt-4
          flex
          flex-col
          items-center
          justify-center
          sm:flex-row-reverse
          sm:justify-start
          gap-2
        "
      >
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteMessageModal;
