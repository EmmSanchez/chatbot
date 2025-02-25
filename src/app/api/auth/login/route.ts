import { logInUser } from "@/app/controllers/loginController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, username } = await req.json();
    if (!userId || !username) {
      return NextResponse.json({
        success: false,
        message: "Id or username is empty",
      });
    }

    const user = await logInUser(userId, username);
    return NextResponse.json({ succes: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
