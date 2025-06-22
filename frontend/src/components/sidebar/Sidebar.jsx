import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-full p-4 bg-gray-900 bg-opacity-10 backdrop-blur-lg border-r border-slate-500">
      <SearchInput />
      <div className="divider px-3" />

      {/* Make Conversations scrollable and grow */}
      <div className="flex-1 overflow-y-auto">
        <Conversations />
      </div>

      {/* Logout button pinned to bottom */}
      <div className="pt-4 mb-1">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
