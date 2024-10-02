import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Message } from '../App';



const ChatArea: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [topic, setTopic] = useState<string | null>(null);

  useEffect(() => {
    // Initial bot message asking for the topic
    const initialBotMessage: Message = {
      text: 'What topic would you like to study?',
      sender: "bot",
    };
    setMessages([initialBotMessage]);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const userMessage: Message = { text: inputValue, sender: "user" };

      // Add user message first
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // If no topic has been selected yet, treat the user's input as the topic
      if (!topic) {
        setTopic(inputValue); // Save the input as the topic
        const botResponse: Message = {
          text: `Great! Let's start with ${inputValue}. Ask me anything about it.`,
          sender: "bot",
        };

        // Add the bot response after the user message
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 500); // Slight delay for bot response
      } else {
        // If the topic is already set, provide a standard bot response
        const botResponse: Message = {
          text: `This is a bot response to your question on "${topic}".`,
          sender: "bot",
        };

        // Add the bot response after the user message
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 500); // Slight delay for bot response
      }

      setInputValue(''); // Clear input field after sending
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 120px)', // Adjust for header and input field
        paddingTop: '70px', // Adjust for header
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Messages Display Area */}
      <Box
        sx={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender == "user" ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '10px',
                backgroundColor: message.sender == "user" ? '#4CAF50' : '#fff',
                color: message.sender == "user" ? '#fff' : '#000',
                borderRadius: '18px',
                maxWidth: '60%',
                wordWrap: 'break-word',
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'left', // Center the input area horizontally
          padding: '10px',
          backgroundColor: '##1C1C1C', // Dark gray color for the input tab
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        {/* Input Container (width reduced by 40%) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#505050',
            width: '80%', // 80% of the screen width, making it smaller by 20%
            borderRadius: '50px', // New border-radius for rounded corners
            padding: '5px 10px',
          }}
        >
          {/* Attach Button on Left Side */}
          <IconButton
            sx={{
              color: '#fff', // White icon for Attach
              marginRight: '10px',
            }}
          >
            <AttachFileIcon />
          </IconButton>

          {/* Input Field */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} // Add this for handling "Enter" key
            sx={{
              backgroundColor: '#505050', // Matches input tab background color
              borderRadius: '50px', // New border-radius for rounded input field
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#505050', // No border
                },
              },
              color: '#fff', // White text inside the input
            }}
            InputProps={{
              sx: {
                color: '#fff', // White text color for user input
                paddingRight: '100px', // Padding to prevent Send and Mic icons from overlapping the text
              },
            }}
          />

          {/* Mic and Send Buttons on Right Side */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            {/* Mic Button */}
            <IconButton
              sx={{
                color: '#fff', // White icon for Mic
              }}
            >
              <MicIcon />
            </IconButton>

            {/* Send Button */}
            <IconButton
              onClick={handleSendMessage}
              sx={{
                color: '#fff', // White icon for Send
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatArea;
