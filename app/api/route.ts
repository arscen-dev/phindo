import { NextResponse } from "next/server";
import { Message } from "@/types/test";

export async function GET(): Promise<NextResponse<Message>> {
  const message: Message = {
    message:
      "this is a test message type " +
      Math.random().toString(36).substring(2, 15),
    status: 200,
  };

  return NextResponse.json(message);
}
