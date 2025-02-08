"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarBody } from "./SidebarBody";
import SidebarHead from "./SidebarHead";
import SidebarFoot from "./SidebarFoot";

//  #F9F9F7

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#F9F9F7] dark:bg-zinc-900 text-zinc-800 dark:text-white border-r-2 border-[#EDEDED] dark:border-zinc-800"
    >
      <SidebarHead />
      <SidebarBody />
      <SidebarFoot />
    </Sidebar>
  );
}
