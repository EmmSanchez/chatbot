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
import { useListOfChatsState } from "@/store/store";
// import { useChat } from "ai/react";

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
  const chatsInfo = useListOfChatsState((state) => state.chatsInfo);
  // const { messages } = useChat();

  const getChatById = (id: string) => {
    alert(id);
    // const messages = await fetch("/api/")
  };

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
                        className={`rounded-[6px] hover:bg-[#DDE0D6] dark:hover:bg-zinc-800 transition-colors group-data-[state=open]/collapsible:hover:bg-[#DDE0D6] dark:group-data-[state=open]/collapsible:hover:bg-zinc-800 `}
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
                              {chatsInfo && (
                                <SidebarMenuSub className="border-l-2 border-[#EDEDED] dark:border-zinc-800">
                                  {chatsInfo.map((chat, index) => {
                                    return (
                                      <SidebarMenuSubItem
                                        key={index}
                                        className="hover:bg-[#DDE0D6] dark:hover:bg-zinc-800 transition-colors rounded-[6px] hover:cursor-pointer"
                                      >
                                        <SidebarMenuSubButton
                                          onClick={() =>
                                            getChatById(chat.chatId)
                                          }
                                          className="whitespace-nowrap"
                                        >
                                          {chat.firstMessage.slice(0, 25)} ...
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    );
                                  })}
                                </SidebarMenuSub>
                              )}
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
                  className="rounded-[6px] transition-colors hover:bg-[#DDE0D6] dark:hover:bg-zinc-800 "
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
