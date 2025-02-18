"use client";

import { usePrivy } from "@privy-io/react-auth";
import { LogOutIcon } from "lucide-react";
import React from "react";

function LogoutButton() {
  const { logout, authenticated } = usePrivy();

  return (
    <>
      {authenticated && (
        <>
          <button
            onClick={logout}
            className="flex size-7 justify-center items-center"
          >
            <LogOutIcon className="size-4 dark:invert" />
          </button>
        </>
      )}
    </>
  );
}

export default LogoutButton;
