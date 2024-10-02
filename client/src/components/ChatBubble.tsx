import React from 'react';
import { Box, Typography } from "@mui/material";
import { Message } from '../App';


const ChatBubble: React.FC<Message> = ({ sender, text }) => { 
  const position = sender === 'bot' ? 'left' : 'right'; // Determine position based on sender

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
        marginBottom: '10px',
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: position === 'left' ? '#333' : '#007aff', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '10px', 
          maxWidth: '60%',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body1">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;
