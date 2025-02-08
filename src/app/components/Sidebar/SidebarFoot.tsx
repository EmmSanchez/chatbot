import { SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";

export default function SidebarFoot() {
  const { setTheme, theme } = useTheme();
  const { state } = useSidebar();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <SidebarFooter className="mb-3">
      <div
        className={`flex relative rounded-xl ${
          state === "expanded" ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
      >
        <div
          className={`flex absolute items-center w-full pointer-events-none ${
            hydrated
              ? theme === "light"
                ? "justify-start"
                : "justify-end"
              : ""
          }`}
        >
          <motion.div
            className={`w-1/2 h-6 bg-white dark:bg-black transition-colors rounded-xl border-solid border-[1px] border-zinc-300 dark:border-zinc-800 pointer-events-none ${
              state === "collapsed" && "hidden"
            }`}
            layout={state === "expanded"}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>

        {state === "expanded" ? (
          <div className="flex w-full justify-around">
            <button
              onClick={() => setTheme("light")}
              className="relative flex flex-1 justify-center py-1 text-sm text-zinc-700 dark:text-zinc-400"
            >
              <Sun className="size-4" />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className="relative flex flex-1 justify-center py-1 text-sm text-zinc-500 dark:text-zinc-300"
            >
              <Moon className="size-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex justify-center items-center w-full p-2 rounded-[6px] hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors"
          >
            <AnimatePresence mode="popLayout">
              {theme === "light" ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                >
                  <Sun className="size-4 flex-shrink-0" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                >
                  <Moon className="size-4 flex-shrink-0" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </SidebarFooter>
  );
}
