import React from "react";
import { Avatar, Paper, Box, Typography } from "@mui/material";

// You can replace this with an actual image import
// import profileImage from "../assets/profile.jpg";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
}

const ChatBubble = ({message, sender}: ChatBubbleProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: sender === "user" ? "flex-end" : "flex-start" }}>
      {sender === "bot" && (
        <Avatar
          src="https://images.edrawmind.com/article/socrates-biography-philosophy-facts-mind-maps/socrate800.jpg"
          sx={{ width: 40, height: 40, marginRight: "10px" }}
        />
      )}
      <Paper
        sx={{
          padding: "15px",
          maxWidth: "300px",
          borderRadius: "15px",
          backgroundColor: sender === "user" ? "#4CAF50" : "white",
          color: sender === "user" ? "white" : "black",
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
