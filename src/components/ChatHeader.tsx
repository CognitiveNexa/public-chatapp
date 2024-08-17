import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ChatHeader: React.FC = () => {
  return (
    <Box width="100%" bg="black" padding="3" borderRadius="md">
      <Text color="white" fontWeight="bold" textAlign="center">
        Chat Room
      </Text>
    </Box>
  );
};

export default ChatHeader;
