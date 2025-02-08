import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import Image from "next/image";

export default function SidebarHead() {
  const { state } = useSidebar();

  return (
    <SidebarHeader className="border-solid border-b-2 border-[#EDEDED] dark:border-zinc-800">
      <SidebarMenu>
        <SidebarMenuItem className={`rounded-[8px] transition-all ease-in-out`}>
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
  );
}
