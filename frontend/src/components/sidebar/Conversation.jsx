"use client";

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useUnreadMessages from "../../hooks/useUnreadMessages";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { unreadCounts = {} } = useUnreadMessages();
  const unreadCount = unreadCounts[conversation._id] || 0;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-base-100 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-base-300" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-base-content">{conversation.fullName}</p>
            {unreadCount > 0 && (
              <div className="unread-badge">
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
