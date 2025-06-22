import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = ({ isMobile }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 bg-opacity-10 backdrop-blur-lg text-white">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Mobile back button */}
      {isMobile && (
  <button
    onClick={() => setSelectedConversation(null)}
    className="md:hidden absolute top-2 left-2 z-10 flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-full shadow-md transition"
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
          <div className="bg-slate-500 px-4 py-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <Messages />
            <MessageInput />
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
