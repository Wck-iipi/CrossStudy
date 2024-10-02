import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('User message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',  // Set the background color of the input area to match the chat area
        padding: '10px',
        width: '100%',
        borderTop: '1px solid #4b4b4b',
        boxSizing: 'border-box',
        position: 'fixed',  // Stick the input to the bottom of the page
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Attach Button on the left */}
      <IconButton sx={{ color: '#fff' }}>
        <AttachFileIcon />
      </IconButton>

      {/* Input Field */}
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          backgroundColor: '#1C1C1C',
          color: '#fff',
          borderRadius: '50px',
          flexGrow: 1,
          marginRight: '10px',
          input: {
            color: '#fff', // Make sure the text is white
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff', // Set the border color to white
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
        }}
      />

      {/* Mic Button */}
      <IconButton sx={{ color: '#fff' }}>
        <MicIcon />
      </IconButton>

      {/* Send Button */}
      <IconButton sx={{ color: '#fff' }} onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;

