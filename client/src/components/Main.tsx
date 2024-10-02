
import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";

const Main: React.FC = () => {
return(
   <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        overflow: 'hidden', 
        fontFamily: 'Roboto, sans-serif', 
        backgroundColor: '#f5f5f5'
      }}
    >
      {/* Sidebar */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          overflowY: 'auto',
          backgroundColor: '#1c1c1c', 
          color: 'white' 
        }}
      >
        <Header />
        <Box sx={{ flexGrow: 1, padding: '20px' }}>
          <ChatArea />
        </Box>
      </Box>
    </Box>
    );
};

export default Main;
