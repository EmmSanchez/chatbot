import { addMessage } from "@/app/controllers/saveMessageController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chat_id, user_id, rol, content } = await req.json();
    const response = await addMessage(chat_id, user_id, rol, content);

    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error saving message in route",
        error: error,
      },
      { status: 500 }
    );
  }
}
