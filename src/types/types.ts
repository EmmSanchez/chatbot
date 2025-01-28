export interface Message {
  role: "user" | "bot";
  content: string;
  date: Date;
  status: "sent" | "pending" | "failed";
}
