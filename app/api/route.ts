import { NextResponse } from "next/server";
import { Message } from "@/types/test";

export async function GET(): Promise<NextResponse<Message>> {
  const message: Message = {
    message: "this is a test message type",
    status: 200,
  };

  return NextResponse.json(message);
}
