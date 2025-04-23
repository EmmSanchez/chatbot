export interface Message {
  role: "user" | "bot";
  content: string;
  date: Date;
  status: "sent" | "pending" | "failed";
}

export const TYPES_OF_MESSAGES = {
  FIRST_MESSAGE: "FIRST_MESSAGE",
  NORMAL_MESSAGE: "NORMAL_MESSAGE",
} as const;

export type MessageType = keyof typeof TYPES_OF_MESSAGES;
