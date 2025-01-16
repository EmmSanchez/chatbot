import {
  LogInIcon,
  MessageSquareText,
  PanelLeftIcon,
} from "@/app/components/Icons/SidebarIcons";

// const exampleMessages = [
//   {
//     id: 1,
//     sender: "bot",
//     text: "¡Hola! ¿Cómo te puedo ayudar?",
//     timestamp: "2025-01-15T10:00:00Z",
//   },
//   {
//     id: 2,
//     sender: "user",
//     text: "Hola, quiero información sobre mi cuenta.",
//     timestamp: "2025-01-15T10:01:00Z",
//   },
//   {
//     id: 3,
//     sender: "bot",
//     text: "Claro, ¿qué información necesitas sobre tu cuenta?",
//     timestamp: "2025-01-15T10:01:30Z",
//   },
//   {
//     id: 4,
//     sender: "user",
//     text: "¿Cuál es mi saldo actual?",
//     timestamp: "2025-01-15T10:02:00Z",
//   },
//   {
//     id: 5,
//     sender: "bot",
//     text: "Tu saldo actual es de $1,250.00.",
//     timestamp: "2025-01-15T10:02:30Z",
//   },
//   {
//     id: 6,
//     sender: "user",
//     text: "Gracias, eso era todo.",
//     timestamp: "2025-01-15T10:03:00Z",
//   },
//   {
//     id: 7,
//     sender: "bot",
//     text: "De nada, ¡que tengas un buen día!",
//     timestamp: "2025-01-15T10:03:30Z",
//   },
// ];
interface SidebarProps {
  toggleSidebar: () => void;
}

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full border-solid border-r-[1px] border-[#ffffff]/10">
      <section className="flex flex-col p-2 gap-3 border-b-[1px] border-solid border-[#ffffff]/10">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-bold">Panda AI</h1>
          <button onClick={toggleSidebar}>
            <PanelLeftIcon className="size-10 p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer" />
          </button>
        </div>

        {/* Login Button */}
        <button className="flex justify-center items-center px-2 py-1 gap-2 bg-green-200 text-green-950 rounded-md hover:bg-green-300 transition-all">
          <LogInIcon className="text-green-950 size-4" />
          Log in
        </button>
      </section>

      <section className="flex flex-col gap-1 px-2 pt-4">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer">
          <MessageSquareText className="size-5" />
          <p className="text-sm">Chat Number #1</p>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer">
          <MessageSquareText className="size-5" />
          <p className="text-sm">Chat Number #2</p>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer">
          <MessageSquareText className="size-5" />
          <p className="text-sm">Chat Number #3</p>
        </div>
      </section>
    </aside>
  );
}
