"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquareText, Plus } from "lucide-react";
import { useState } from "react";

const items = [
  {
    title: "New Chat",
    url: "#",
    icon: Plus,
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageSquareText,
  },
];

export function SidebarBody() {
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarContent>
          <SidebarMenu>
            {items.map((item, index) => {
              if (item.title === "Messages") {
                return (
                  <Collapsible
                    defaultOpen={false}
                    className="group/collapsible"
                    key={index}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                        className={`hover:bg-[#EFEFEF] rounded-md hover:text-black group-data-[state=open]/collapsible:hover:hover:bg-[#EFEFEF] group-data-[state=open]/collapsible:hover:hover:text-black`}
                      >
                        <CollapsibleTrigger>
                          <MessageSquareText />
                          Messages
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>

                      {
                        <AnimatePresence>
                          {isMessagesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 1, y: -10 }}
                              transition={{
                                duration: 0.1,
                              }}
                            >
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton>
                                    Mensaje 1
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      }
                      {/* <CollapsibleContent></CollapsibleContent> */}
                    </SidebarMenuItem>
                    <SidebarGroup></SidebarGroup>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem
                  key={index}
                  className="hover:bg-[#EFEFEF] rounded-md hover:text-black"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
