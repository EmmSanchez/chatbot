"use client";

import Chat from "./components/Chat/Chat";

// import { useState } from "react";

export default function Home() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className="flex h-full justify-center">
      <Chat />
    </div>
  );
}
