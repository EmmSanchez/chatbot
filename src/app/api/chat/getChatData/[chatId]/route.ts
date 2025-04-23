import { getChatById } from "@/app/controllers/getChatById";
import { NextRequest, NextResponse } from "next/server";

type GetParams = {
  params: {
    chatId: string;
  };
};

export async function GET(request: NextRequest, { params }: GetParams) {
  try {
    const { chatId } = await params;

    if (!chatId) {
      return NextResponse.json(
        { success: false, message: "Chat ID is required" },
        { status: 400 }
      );
    }

    const messages = await getChatById(chatId);

    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching chat messages", error: error },
      { status: 500 }
    );
  }
}
