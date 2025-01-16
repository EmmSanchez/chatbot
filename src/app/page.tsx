"use client";

import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full h-dvh">
      <Sidebar toggleSidebar={toggleSidebar} />
      <Chat toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
