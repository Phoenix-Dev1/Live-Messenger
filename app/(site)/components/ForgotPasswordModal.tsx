"use client";

import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      masterPassword: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/reset-password", data)
      .then(() => {
        toast.success("Password reset successfully!");
        reset();
        onClose();
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error("Invalid Master Password");
        } else if (error.response?.status === 400) {
          toast.error("Please fill in all fields");
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-ash-900 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-ash-500 font-medium leading-relaxed">
              For this demo environment, standard email verification is disabled. Please authorize the password change by entering the master password.
            </p>
          </div>
          <div className="space-y-6 mt-6">
            <Input
              disabled={isLoading}
              id="email"
              label="Email Address"
              type="email"
              required
              errors={errors}
              register={register}
            />
            <Input
              disabled={isLoading}
              id="masterPassword"
              label="Master Password"
              type="password"
              required
              errors={errors}
              register={register}
            />
            <Input
              disabled={isLoading}
              id="newPassword"
              label="New Password"
              type="password"
              required
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <Button disabled={isLoading} secondary onClick={onClose} type="button">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
