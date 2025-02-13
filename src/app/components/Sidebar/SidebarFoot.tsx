import { SidebarFooter } from "@/components/ui/sidebar";
import ToggleTheme from "@/components/ui/toggle-theme";
import React from "react";
import {
  DiscordIcon,
  XSocialIcon,
} from "../../../../public/icons/social-icons";

export default function SidebarFoot() {
  return (
    <SidebarFooter className="mb-3">
      <div className="flex flex-col gap-1 text-sm text-zinc-300">
        <button className="flex justify-between items-center w-full h-12 p-3 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <p>Follow Us</p>
          <XSocialIcon className="size-5" />
        </button>
        <button className="flex justify-between items-center w-full h-12 p-3 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <p>Join Our Discord</p>
          <DiscordIcon className="size-5" />
        </button>
      </div>

      <ToggleTheme />
    </SidebarFooter>
  );
}
