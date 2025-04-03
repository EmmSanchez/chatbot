"use client";

import { useUserStore } from "@/store/store";
import { usePrivy } from "@privy-io/react-auth";
import { LogIn, LogOutIcon } from "lucide-react";
import React, { useEffect } from "react";

export default function AuthButton() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { login, logout, authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated && user) {
      const loginInDB = async () => {
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
          const jsonData = await data.json();

          if (jsonData.succes) {
            const { id, username } = jsonData.user;
            setUserInfo(id, username);
          }
        } catch (error) {
          console.error(error);
          throw new Error("Error getting user data");
        }
      };

      loginInDB();
    }
  }, [authenticated]);

  return (
    <>
      {authenticated ? (
        <>
          <button
            onClick={logout}
            className="flex h-7 justify-center items-center gap-2 px-4 border border-zinc-300 dark:border-zinc-600 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            <span className="text-sm text-zinc-700 dark:text-zinc-200">
              {userInfo.username.slice(0, 5)}
            </span>
            <LogOutIcon className="size-[14px] dark:invert" />
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
