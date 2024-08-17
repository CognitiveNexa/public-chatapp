import { useState } from "react";
import { Box, Input, IconButton, HStack } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { getUserID } from "../utils/getUserID";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ text: message, sender_id: getUserID() }]);

      if (error) {
        console.error("Error inserting message:", error.message);
      } else {
        console.log("Message sent:", data);
      }

      setMessage("");
    }
  };

  return (
    <Box width="100%">
      <HStack spacing="2">
        <Input
          placeholder="Type a message..."
          color={"white"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <IconButton
          aria-label="Send Message"
          icon={<FaPaperPlane />}
          onClick={handleSendMessage}
        />
      </HStack>
    </Box>
  );
};

export default MessageInput;
