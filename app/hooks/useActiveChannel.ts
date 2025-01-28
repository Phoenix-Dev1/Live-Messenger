import { useEffect } from "react";
import useActiveList from "./useActiveList";
import { pusherClient } from "../libs/pusher";
import { Members } from "pusher-js"; // Import the Members type from pusher-js

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();

  useEffect(() => {
    // Subscribe to the "presence-messenger" channel
    const channel = pusherClient.subscribe("presence-messenger");

    // Handle when subscription succeeds
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers); // Set the list of members
    });

    // Handle when a new member joins
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id); // Add the new member to the list
    });

    // Handle when a member leaves
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id); // Remove the member from the list
    });

    // Cleanup function
    return () => {
      pusherClient.unsubscribe("presence-messenger"); // Unsubscribe when the component unmounts
    };
  }, [set, add, remove]); // Dependencies: These functions should come from a stable reference
};

export default useActiveChannel;
