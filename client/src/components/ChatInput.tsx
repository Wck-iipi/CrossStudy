import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type OnSendMessage = (input: string) => void;

interface ChatInputProps {
  onSendMessage: OnSendMessage; 
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(String(inputMessage)); // Convert to string if not already
      setInputMessage(""); // Clear input field
    }
  };

  return (
    <Paper
      sx={{
        marginTop: "auto",
        padding: "10px 20px",
        backgroundColor: "#333",
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        position: "fixed",
        bottom: "10px",
        width: "80%",
        left: "11%",
      }}
    >
      <InputBase
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        sx={{ flexGrow: 1, color: "white" }}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <IconButton onClick={handleSendMessage}>
        <SendIcon sx={{ color: "white" }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
