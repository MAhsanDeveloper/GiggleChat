import Sidebar from "/src/components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 return (
  <div className="flex h-screen w-full">
    {isMobile ? (
      selectedConversation ? (
        // Only show MessageContainer on mobile when a conversation is selected
        <div className="w-full h-full fixed inset-0 z-10 bg-black">
          <MessageContainer isMobile={true} />
        </div>
      ) : (
        // Only show Sidebar on mobile when no conversation is selected
        <div className="w-full h-full fixed inset-0 z-10 bg-black">
          <Sidebar isMobile={true} />
        </div>
      )
    ) : (
      <>
        <div className="w-[30%] h-screen">
          <Sidebar />
        </div>
        <div className="w-[70%] h-screen">
          <MessageContainer />
        </div>
      </>
    )}
  </div>
);
};

export default Home;
