import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // Fetch the user's session
    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    // Extract the socket_id and channel_name from the request body
    const { socket_id: socketId, channel_name: channel } = request.body;

    if (!socketId || !channel) {
      return response
        .status(400)
        .json({ error: "Missing socket_id or channel_name" });
    }

    // Authorize the channel using Pusher
    const authResponse = pusherServer.authorizeChannel(socketId, channel, {
      user_id: session.user.email,
    });

    // Return the auth response
    return response.status(200).json(authResponse);
  } catch (error) {
    console.error("Pusher auth error:", error);
    return response.status(500).json({ error: "Internal server error" }); // Catch unexpected errors
  }
}
