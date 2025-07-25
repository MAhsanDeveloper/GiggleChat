import React, { Suspense } from "react";

const Conversations = React.lazy(() => import("./Conversations"));
const SearchInput = React.lazy(() => import("./SearchInput"));
const LogoutButton = React.lazy(() => import("./LogoutButton"));

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-full bg-gradient-to-b from-gray-900/90 to-blue-900/70 backdrop-blur-lg border-r border-slate-700 shadow-lg">
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

      {/* Sticky Logout for desktop, floating for mobile */}
      <Suspense fallback={<div className="p-4"></div>}>
        <div className="relative z-30">
          <div
            className="
      md:static
      fixed bottom-0 left-0 w-full
      px-4 py-3
      flex justify-end
      md:justify-center md:py-4 md:mb-1
      bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent
      md:bg-none
      sm:mb-3
    "
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 1.5rem)",
              backdropFilter: "blur(8px)",
            }}
          >
            <LogoutButton />
          </div>
        </div>
      </Suspense>
    </aside>
  );
};

export default Sidebar;
