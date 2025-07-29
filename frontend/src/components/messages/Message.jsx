import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
const bubbleBgColor = fromMe ? "bg-primary text-primary-content" : "bg-base-300 text-base-content";

  const shakeClass = message.shouldShake ? "shake" : "";


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      {fromMe && selectedConversation && (
  <>
    {Array.isArray(message.readBy) &&
    message.readBy?.map(String).includes(selectedConversation._id.toString()) ? (
      <span className="text-blue-500 tracking-tighter">✔✔</span>
    ) : Array.isArray(message.deliveredTo) &&
      message.deliveredTo.map(String).includes(selectedConversation._id.toString()) ? (
      <span className="text-gray-500 tracking-tighter">✔✔</span>
    ) : (
      <span>✔</span>
    )}
  </>
)}

      </div>
    </div>
  );
};
export default Message;
