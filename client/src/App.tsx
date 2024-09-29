import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import { generateBotResponse, handleUserMessage } from "./utils/chatFunctions";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to handle user input
  const sendMessage = (input: string) => {
    const userMessage = handleUserMessage(input);

    // Add user message (right-side bubble)
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }]);

    // Simulate bot response after 1 second
    setTimeout(() => {
      const botMessage = generateBotResponse(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#121212" }}>
      {/* Left Sidebar */}
      <Grid item xs={1}>
        <Sidebar />
      </Grid>

      {/* Main Section */}
      <Grid item xs={11} sx={{ padding: "20px" }}>
        {/* Header */}
        <Header />

        {/* Chat Area */}
        <Box sx={{ height: "70vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.text} sender={message.sender} />
          ))}
        </Box>

        {/* Chat Input */}
        <ChatInput onSendMessage={sendMessage} />
      </Grid>
    </Grid>
  );
};

export default App;

