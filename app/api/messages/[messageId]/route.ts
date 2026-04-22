import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  messageId: string;
}

export async function PATCH(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { messageId } = params;
    const { body: messageBody } = body;

    const EDIT_TIME_LIMIT = 5 * 60 * 1000; // 5 minute

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMessage = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        sender: true,
      },
    });

    if (!existingMessage) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (existingMessage.sender.id !== currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const now = new Date();
    const messageAge = now.getTime() - existingMessage.createdAt.getTime();
    const GRACE_PERIOD = 10 * 1000; // 10 second buffer

    if (messageAge > (EDIT_TIME_LIMIT + GRACE_PERIOD)) {
      console.log("[MESSAGE_PATCH] Window expired:", { messageAge, limit: EDIT_TIME_LIMIT });
      return new NextResponse("Edit window expired", { status: 400 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        body: messageBody,
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    await pusherServer.trigger(
      updatedMessage.conversationId,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGE_PATCH");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { messageId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the message to check ownership and get conversationId
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        sender: true,
      },
    });

    if (!message) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Security check: Only the sender can delete the message
    if (message.sender.id !== currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the message
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    // Notify all clients via Pusher
    await pusherServer.trigger(
      message.conversationId,
      "message:delete",
      messageId
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGE_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
