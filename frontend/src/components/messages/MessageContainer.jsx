import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = ({ isMobile }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-900/80 to-blue-900/60 backdrop-blur-lg text-white relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Mobile back button */}
          {isMobile && (
            <button
              onClick={() => setSelectedConversation(null)}
              className="md:hidden absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full shadow-lg transition"
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

          {/* Header */}
          <div className="flex items-center gap-3 bg-slate-800/90 px-6 py-3 border-b border-slate-700 shadow-sm sticky top-0 z-10">
            <img
              src={selectedConversation.profilePic}
              alt={selectedConversation.fullName}
              className="w-10 h-10 rounded-full border-2 border-blue-400 shadow"
            />
            <div>
              <div className="font-semibold text-lg text-white">
                {selectedConversation.fullName}
              </div>
              <div className="text-xs text-gray-300">
                {selectedConversation.username}
              </div>
            </div>
          </div>

          {/* Messages and Input */}
          <div className="flex flex-col flex-1 overflow-hidden bg-gradient-to-t from-slate-900/60 to-transparent">
            <Messages />
            <div className="bg-slate-800/80 p-3 border-t border-slate-700">
              <MessageInput />
            </div>
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
