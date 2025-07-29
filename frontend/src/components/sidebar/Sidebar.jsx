import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
const Conversations = React.lazy(() => import("./Conversations"));
const SearchInput = React.lazy(() => import("./SearchInput"));
const LogoutButton = React.lazy(() => import("./LogoutButton"));
import { PiPalette} from "react-icons/pi";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="flex flex-col h-screen w-full bg-base-200 border-r border-base-300 shadow-lg">
      {/* Search */}
      <Suspense fallback={<div className="p-4"></div>}>
        <div className="p-4 pb-2">
          <SearchInput />
        </div>
      </Suspense>
      <div className="divider m-0" />

      {/* Conversations List */}
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <div className="flex-1 overflow-y-auto px-2 py-2 custom-scrollbar">
          <Conversations />
        </div>
      </Suspense>

      <div className="px-2 pb-3 w-full">
        <div className="flex justify-between gap-2">

      {/* Settings Button */}
      <button
        onClick={() => navigate("/themes")}
        className="btn btn-sm bg-base-300 text-base-content hover:bg-base-100"
      >
        <PiPalette size={18} />
        <span className="text-sm font-medium">Themes</span>
      </button>

      {/* Sticky Logout for desktop, floating for mobile */}
      <Suspense fallback={<div className="p-4"></div>}>
          <div
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 1.5rem)",
              backdropFilter: "blur(8px)",
            }}
          >
            <LogoutButton />
          </div>
 
                 
      </Suspense>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
