import { motion } from "motion/react";
import { PanelLeftIcon } from "../Icons/SidebarIcons";

interface ChatProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Chat({ isSidebarOpen, toggleSidebar }: ChatProps) {
  console.log(isSidebarOpen);

  return (
    <motion.div
      initial={{
        width: "calc(100% - 256px)",
      }}
      animate={{
        width: isSidebarOpen ? "calc(100% - 256px)" : "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="absolute z-10 top-0 right-0 bg-zinc-900 flex flex-col h-full justify-center items-center origin-left"
    >
      <div className="flex">
        <button onClick={toggleSidebar}>
          <PanelLeftIcon />
        </button>
      </div>
      <h1>Chat</h1>
    </motion.div>
  );
}
