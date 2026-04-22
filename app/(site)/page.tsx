import Image from "next/image";
import AuthForm from "./components/AuthForm";
import AmbientBackground from "./components/AmbientBackground";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-ash-50 overflow-hidden">
      <div className="flex flex-col justify-center w-full lg:w-[35%] xl:w-[30%] min-h-full px-8 sm:px-12 lg:px-16 z-20 bg-ash-50 shadow-2xl relative">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex justify-center mb-10">
            <svg
              className="w-16 h-16 text-[#60a5fa]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="10" x2="15" y2="10" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-ash-900 mb-8 text-center">
            Ready for dustoff.
          </h2>
          <AuthForm />
        </div>
      </div>
      <div className="hidden lg:block lg:w-[65%] xl:w-[70%] h-screen relative">
        <AmbientBackground />
      </div>
    </div>
  );
}
