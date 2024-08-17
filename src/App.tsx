import React from "react";
import { ChakraProvider, Box, VStack, Card } from "@chakra-ui/react";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import MessageDisplay from "./components/MessageDisplay";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="black"
      >
        <Card
          width="400px"
          bg="rgb(35 32 32 / 45%)"
          shadow="md"
          borderRadius="md"
          padding="4"
          backdropFilter="blur(10px)"
        >
          <VStack spacing="4" height={"70vh"}>
            <ChatHeader />
            <MessageDisplay />
            <MessageInput />
          </VStack>
        </Card>
      </Box>
    </ChakraProvider>
  );
};

export default App;
