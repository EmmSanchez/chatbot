import {
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ToggleTheme from "@/components/ui/toggle-theme";
import React from "react";
import {
  DiscordIcon,
  XSocialIcon,
} from "../../../../public/icons/social-icons";

const socials = [
  {
    title: "Follow Us",
    url: "#",
    icon: XSocialIcon,
  },
  {
    title: "Messages",
    url: "#",
    icon: DiscordIcon,
  },
];

export default function SidebarFoot() {
  return (
    <SidebarFooter className="mb-3">
      <SidebarContent className="w-fit">
        <SidebarMenu>
          {socials.map((item, index) => {
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className="underline-offset-4 transition hover:underline"
                >
                  <a href={item.url} className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span className="text-sm dark:text-zinc-200">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <ToggleTheme />
    </SidebarFooter>
  );
}
