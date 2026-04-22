"use client";

import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

type Variant = "LOGIN" | "REGISTER";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else setVariant("LOGIN");
    setErrorMsg("");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "visit@mail.co.il",
      password: "1234",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setErrorMsg("");

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => {
          setErrorMsg("Something went wrong during registration.");
          setShake(true);
          setTimeout(() => setShake(false), 500);
        })
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            setErrorMsg("Invalid credentials. Please try again.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setIsLoading(false);
          }
          if (callback?.ok && !callback.error) {
            setIsSuccess(true);
            setTimeout(() => {
              router.push("/users");
            }, 1200);
          }
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    setErrorMsg("");

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          setErrorMsg("Invalid credentials. Please try again.");
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setIsLoading(false);
        }
        if (callback?.ok && !callback?.error) {
          setIsSuccess(true);
          setTimeout(() => {
            router.push("/users");
          }, 1200);
        }
      });
  };

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-ash-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="text-forest-500 mb-4"
            >
              <CgSpinner size={40} />
            </motion.div>
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-ash-900 font-bold text-lg"
            >
              Authenticating...
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={shake ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : "show"}
        className="w-full"
      >
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm font-semibold"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <motion.div variants={itemVariants}>
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading || isSuccess}
              />
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <Input
              id="email"
              label="Email Address"
              type="email"
              register={register}
              errors={errors}
              disabled={isLoading || isSuccess}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading || isSuccess}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button disabled={isLoading || isSuccess} fullWidth type="submit">
              {isLoading ? "Please wait..." : variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ash-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
              <span className="bg-ash-50 px-2 text-ash-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-2 justify-start text-sm mt-8 text-ash-500 font-medium"
        >
          <div>
            {variant === "LOGIN" ? "New here?" : "Already registered?"}
          </div>
          <button 
            type="button"
            onClick={toggleVariant} 
            disabled={isLoading || isSuccess}
            className="text-ash-900 font-bold hover:underline underline-offset-4 disabled:opacity-50"
          >
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
