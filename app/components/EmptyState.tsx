const EmptyState = () => {
  return (
    <div
      className="
        px-4 py-10 sm:px-6 lg:px-8
        h-full flex justify-center items-center
        bg-ash-50
      "
    >
      <div className="text-center flex flex-col items-center gap-5">
        {/* Same SVG logo as the login screen */}
        <svg
          className="w-24 h-24 text-[#60a5fa]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>

        <p className="text-xl font-bold text-ash-900">
          Welcome To Live Messenger
        </p>
        <p className="text-sm text-ash-500 font-medium">
          Select a user from the list to begin your conversation.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
