"use client";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarBody } from "./SidebarBody";
import Image from "next/image";

//  #F9F9F7

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#F9F9F7] text-zinc-800 border-r-2 border-[#EDEDED]"
    >
      <SidebarHeader className="border-solid border-b-2 border-[#EDEDED]">
        <SidebarMenu>
          <SidebarMenuItem
            className={`rounded-[8px] transition-all ease-in-out`}
          >
            <div
              className={`flex items-center gap-4 bg-[#1091ea] rounded-[8px] transition-all ease-in-out ${
                state === "expanded" ? "size-12 p-2 " : "size-8 p-1"
              }`}
            >
              <Image
                src={"/img/Lume_logo.svg"}
                width={50}
                height={50}
                alt="Lume logo"
                className="object-cover w-full h-full"
              />
              <h1
                className={`text-xl font-semibold whitespace-nowrap transition-all ease-in-out ${
                  state === "collapsed" && "hidden"
                }`}
              >
                Lume AI
              </h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarBody />
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
