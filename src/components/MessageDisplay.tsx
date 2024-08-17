import { useEffect, useState } from "react";
import { VStack, Box, Text, Divider } from "@chakra-ui/react";
import { format } from "date-fns";
import { getUserID } from "../utils/getUserID";
import { supabase } from "../supabaseClient";

interface Message {
  id: number;
  text: string;
  created_at: string;
  sender_id: string;
}

const MessageDisplay = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();

    const messageSubscription = subscribeToMessageChanges();

    return () => {
      unsubscribeFromMessageChanges(messageSubscription);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setMessages(data || []);
    }
  };

  const handleInsert = (payload: any) => {
    console.log("INSERT received!", payload);
    fetchMessages();
  };

  const handleUpdate = (payload: any) => {
    console.log("UPDATE received!", payload);
    fetchMessages();
  };

  const handleDelete = (payload: any) => {
    console.log("DELETE received!", payload);
    fetchMessages();
  };

  const subscribeToMessageChanges = () => {
    const messageSubscription = supabase
      .channel("message-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleInsert
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        handleUpdate
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        handleDelete
      )
      .subscribe();

    return messageSubscription;
  };

  const unsubscribeFromMessageChanges = (subscription: any) => {
    subscription.unsubscribe();
  };

  return (
    <VStack
      width="100%"
      flex="1"
      spacing="3"
      align="stretch"
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          alignSelf={
            message.sender_id === getUserID() ? "flex-end" : "flex-start"
          }maxWidth="80%"
            mb={4}
            minW={"30%"}
        >
          <Box
            bg={message.sender_id === getUserID() ? "blue.200" : "gray.200"}
            padding="2"
           
            borderRadius="md"
            
          >
            <Text fontSize="medium" fontWeight={600}>
              {message.text}
            </Text>
            <Divider />
          </Box>
          <Text
            fontSize="xx-small"
            align={message.sender_id === getUserID() ? "end" : "start"}
            color={"gray.600"}
          >
            {format(new Date(message.created_at), "PPpp")}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default MessageDisplay;
