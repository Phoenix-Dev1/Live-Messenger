import Image from "next/image";
import getCurrentUser from "@/app/actions/getCurrentUser";

const EmptyState = async () => {
  const currentUser = await getCurrentUser(); // Wait for user data
  return (
    <div
      className="
  px-4
  py-10
  sm:px-6
  lg:px-8
  h-full
  flex
  justify-center
  items-center
  bg-gray-100
  "
    >
      <div className="text-center items-center flex flex-col">
        <Image alt="Avatar" src="/images/logo.png" width="400" height="400" />
        <p className="mt-4 text-xl font-semibold text-gray-800">
          Welcome {currentUser?.name || "Guest"}!{" "}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Select a user from the list to begin your conversation.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
