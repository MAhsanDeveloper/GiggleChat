"use client";

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useUnreadMessages from "../../hooks/useUnreadMessages";

const Conversation = ({ conversation, lastIdx}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	   const unreadCounts = useUnreadMessages((state) => state.unreadCounts)
  const unreadCount = unreadCounts[conversation._id] || 0

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' loading="lazy"/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						  {unreadCount > 0 && <div className="unread-badge">{unreadCount > 99 ? "99+" : unreadCount}</div>}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;