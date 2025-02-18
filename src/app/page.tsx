"use client";

import Chat from "./components/Chat/Chat";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { login, authenticated, logout } = usePrivy();

  console.log(authenticated);

  return (
    <div className="flex h-full justify-center items-center overflow-hidden">
      <Chat />
      {authenticated ? (
        <></>
      ) : (
        <div className="absolute flex w-full h-full z-40 top-0 left-0 items-center justify-center backdrop-blur-[2px]">
          <div className="w-96 h-96 bg-zinc-900 absolute p-4 flex flex-col gap-4 rounded-xl">
            <button onClick={login} className="w-full bg-white rounded-xl py-2">
              Login
            </button>
            <button
              onClick={logout}
              className="w-full bg-white rounded-xl py-2"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
