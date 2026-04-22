import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  const apiKey = process.env.DAILY_CO_API_KEY;

  if (!apiKey) {
    console.error("DAILY_CO_API_KEY is not defined in environment variables");
    return new NextResponse("Daily.co API Key missing", { status: 500 });
  }

  try {
    // Creating a room that expires in 1 hour
    const response = await axios.post(
      "https://api.daily.co/v1/rooms",
      {
        properties: {
          exp: Math.round(Date.now() / 1000) + 3600, 
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("[DAILY_ROOM_ERROR]", error.response?.data || error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
