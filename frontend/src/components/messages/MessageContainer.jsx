"use client";

import React from "react";
import useConversation from "../../zustand/useConversation";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import MessageInput from "./MessageInput";

const Messages = React.lazy(() => import("./Messages"));

const MessageContainer = ({ isMobile }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  if (!selectedConversation) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex flex-col full-height w-full min-h-0  bg-base-200 border-r border-base-300 text-base-content relative">
      <div
        className={
          isMobile
            ? "flex items-center justify-center gap-3  px-2 py-2  border-r border-base-300 text-base-content shadow-sm sticky top-0 z-10"
            : "flex items-center gap-3 px-6 py-2 border-r border-base-300 text-base-content shadow-sm sticky top-0 z-10"
        }
        style={isMobile ? { position: "relative" } : {}}
      >
        {isMobile && (
          <button
            onClick={() => setSelectedConversation(null)}
            className="flex items-center gap-2 border-r border-base-300 text-base-content hover:bg-base-100 px-3 py-1.5 rounded-full shadow-lg transition text-base absolute left-2 top-1/2 -translate-y-1/2 z-30"
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
          src={selectedConversation.profilePic || "/placeholder.svg"}
          alt={selectedConversation.fullName}
          className={`w-11 h-11 rounded-full border-r border-base-300 shadow ${
            isMobile ? "ml-14" : ""
          }`}
        />
        <div className={isMobile ? "flex flex-col items-start" : ""}>
          <div className="font-semibold text-lg text-base-content">
            {selectedConversation.fullName}
          </div>
          <div className="text-xs text-base-content">
            {selectedConversation.username}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 border-r border-base-300 overflow-hidden">
        <React.Suspense
          fallback={<div className="text-center p-4">Loading messages...</div>}
        >
          <div className="flex-1 overflow-auto px-1 pb-2 custom-scrollbar">
            <Messages />
          </div>
        </React.Suspense>

        <div
          className={`bg-base-100 p-2 pt-3 border-r border-base-300 ${
            isMobile ? "pb-safe-area-inset-bottom" : "mb-2"
          }`}
          style={
            isMobile
              ? {
                  paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
                  position: "sticky",
                  bottom: 0,
                  zIndex: 10,
                }
              : {}
          }
        >
          <MessageInput isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center border-r border-base-300 text-base-content w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-base-content font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
