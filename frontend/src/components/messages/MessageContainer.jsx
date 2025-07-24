import React from "react";
import useConversation from "../../zustand/useConversation";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const Messages = React.lazy(() => import("./Messages"));
const MessageInput = React.lazy(() => import("./MessageInput"));

const MessageContainer = ({ isMobile }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  if (!selectedConversation) {
  return <NoChatSelected />;
}

  return (
    <div className="flex flex-col h-screen w-full min-h-0 bg-gradient-to-br from-gray-900/80 to-blue-900/60 backdrop-blur-lg text-white relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div
            className={
              isMobile
                ? "flex items-center justify-center gap-3 bg-slate-800/90 px-2 py-2 border-b border-slate-700 shadow-sm sticky top-0 z-10"
                : "flex items-center gap-3 bg-slate-800/90 px-6 py-2 border-b border-slate-700 shadow-sm sticky top-0 z-10"
            }
            style={isMobile ? { position: "relative" } : {}}
          >
            {isMobile && (
              <button
                onClick={() => setSelectedConversation(null)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full shadow-lg transition text-base absolute left-2 top-1/2 -translate-y-1/2 z-30"
                style={{ height: "2.5rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm">Back</span>
              </button>
            )}
            <img
              src={selectedConversation.profilePic}
              alt={selectedConversation.fullName}
              className={`w-11 h-11 rounded-full border-2 border-blue-400 shadow ${
                isMobile ? "ml-14" : ""
              }`}
            />
            <div className={isMobile ? "flex flex-col items-start" : ""}>
              <div className="font-semibold text-lg text-white">
                {selectedConversation.fullName}
              </div>
              <div className="text-xs text-gray-300">
                {selectedConversation.username}
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-t from-slate-900/60 to-transparent overflow-hidden">
            <React.Suspense
              fallback={
                <div className="text-center p-4">Loading messages...</div>
              }
            >
            <div className="flex-1 overflow-auto px-1 pb-2 custom-scrollbar">
              <Messages />
            </div>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="text-center p-4"></div>
              }
            >
              <div
                className="bg-slate-800/90 p-2 pt-3 border-t border-slate-700 mb-2"
              >
                <MessageInput />
              </div>
            </React.Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
