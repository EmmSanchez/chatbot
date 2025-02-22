"use client";

import { usePrivy } from "@privy-io/react-auth";
import { LogIn, LogOutIcon } from "lucide-react";
import React, { useEffect } from "react";

export default function AuthButton() {
  const { login, logout, authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated && user) {
      const login = async () => {
        try {
          const data = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              username: user.email?.address || user.wallet?.address,
            }),
          });
          console.log(data);
        } catch (error) {
          console.error(error);
          throw new Error("Error getting user data");
        }
      };

      login();
    }
  }, [authenticated]);

  return (
    <>
      {authenticated ? (
        <>
          <button
            onClick={logout}
            className="flex size-7 justify-center items-center"
          >
            <LogOutIcon className="size-4 dark:invert" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={login}
            className="flex gap-2 justify-center items-center px-4 py-1 dark:hover:bg-zinc-600 border border-zinc-600 rounded-full"
          >
            <LogIn className="size-4 dark:invert" />
            <span className="dark:text-white text-sm">Log in</span>
          </button>
        </>
      )}
    </>
  );
}
