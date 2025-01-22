"use client";
import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarBody } from "./SidebarBody";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarBody />
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
