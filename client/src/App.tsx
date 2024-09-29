import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import { generateBotResponse, handleUserMessage } from "./utils/chatFunctions";

// EVERY MESSAGE MUST BE FROM USER OR BOT
export interface Message {
  text: string;
  sender: "user" | "bot";
}

// TODO set history
const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to handle user input
  const sendMessage = async (input: string) => {
    const userMessage = handleUserMessage(input);

    // Add user message (right-side bubble)
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }]);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.message; // Assuming the server sends back { message: "bot's response" }

      setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: "bot" }]);

    } catch (error) {
      console.error('Error getting bot response:', error);
      // You might want to display an error message to the user here
    }
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
            <ChatBubble key={index} text={message.text} sender={message.sender} />
          ))}
        </Box>

        {/* Chat Input */}
        <ChatInput onSendMessage={sendMessage} />
      </Grid>
    </Grid>
  );
};

export default App;

