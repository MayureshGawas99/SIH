import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Avatar,
  VStack,
} from '@chakra-ui/react';

const UserProfile = ({ user, onConnect }) => (
  <Box borderWidth="1px" borderRadius="lg" p="4" mx="2">
    <Avatar name={user.name} src={user.avatar} size="lg" />
    <Heading fontSize="xl" mt="2">
      {user.name}
    </Heading>
    <Text fontSize="md" color="gray.500">
      {user.title}
    </Text>
    <Button mt="2" colorScheme="blue" onClick={() => onConnect(user.id)}>
      Connect
    </Button>
  </Box>
);

const NetworkPage = () => {
  const [connections, setConnections] = useState([]);
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      title: 'Software Engineer',
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Product Manager',
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      title: 'Data Scientist',
      avatar: 'https://via.placeholder.com/150',
    },
  ]);

  const handleConnect = (userId) => {
    if (!connections.includes(userId)) {
      setConnections([...connections, userId]);
    }
  };

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        My Networking Page
      </Heading>
      <Box>
        <Heading as="h2" fontSize="lg" mb="2">
          Your Connections
        </Heading>
        <Flex>
          {connections.map((userId) => (
            <UserProfile
              key={userId}
              user={users.find((user) => user.id === userId)}
              onConnect={handleConnect}
            />
          ))}
        </Flex>
      </Box>
      <Box mt="4">
        <Heading as="h2" fontSize="lg" mb="2">
          Discover People
        </Heading>
        <Flex>
          {users.map((user) => (
            <UserProfile
              key={user.id}
              user={user}
              onConnect={handleConnect}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <NetworkPage />
    </ChakraProvider>
  );
}

export default App;
