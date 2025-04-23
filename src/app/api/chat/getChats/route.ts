import { getChatsByUserId } from "@/app/controllers/getChatsByUserController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user_id = await req.nextUrl.searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const chats = await getChatsByUserId(user_id);

    if (chats.length === 0) {
      return NextResponse.json(
        { success: false, message: "No chats found for this user" },
        { status: 200 }
      );
    }

    if (!chats) return;

    return NextResponse.json(
      { success: true, response: chats },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching user's chats", error: error },
      { status: 500 }
    );
  }
}
