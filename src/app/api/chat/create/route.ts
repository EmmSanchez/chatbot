import { addNewChat } from "@/app/controllers/createChatController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();
    const response = await addNewChat(user_id);

    return NextResponse.json({ succes: true, response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error uploading the chat", error: error },
      { status: 500 }
    );
  }
}
