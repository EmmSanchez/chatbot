// import { motion } from "motion/react";
import { PanelLeftIcon } from "../Icons/SidebarIcons";

interface ChatProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Chat({ isSidebarOpen, toggleSidebar }: ChatProps) {
  console.log(isSidebarOpen);

  return (
    <div className="flex flex-grow flex-col h-full justify-center items-center">
      <div className="flex">
        <button onClick={toggleSidebar}>
          <PanelLeftIcon />
        </button>
      </div>
      <h1>Chat</h1>
    </div>
  );
}
