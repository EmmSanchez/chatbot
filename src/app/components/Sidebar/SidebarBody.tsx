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
                        className={`rounded-[6px] hover:bg-[#DDE0D6] transition-colors hover:text-black group-data-[state=open]/collapsible:hover:bg-[#DDE0D6] group-data-[state=open]/collapsible:hover:text-black`}
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
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 1, y: -5 }}
                              transition={{
                                duration: 0.05,
                              }}
                            >
                              <SidebarMenuSub className="border-l-2 border-[#EDEDED]">
                                <SidebarMenuSubItem className="hover:bg-[#DDE0D6] transition-colors rounded-[6px] hover:text-black hover:cursor-pointer">
                                  <SidebarMenuSubButton>
                                    Mensaje 1
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem className="hover:bg-[#DDE0D6] hover:text-black hover:cursor-pointer">
                                  <SidebarMenuSubButton>
                                    Mensaje 2
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem className="hover:bg-[#DDE0D6] hover:text-black hover:cursor-pointer">
                                  <SidebarMenuSubButton>
                                    Mensaje 3
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      }
                      {/* <CollapsibleContent></CollapsibleContent> */}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem
                  key={index}
                  className="rounded-[6px] transition-colors hover:bg-[#DDE0D6] hover:text-black"
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
