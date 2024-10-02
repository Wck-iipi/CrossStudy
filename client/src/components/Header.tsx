import React from 'react';
import { Box, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        backgroundColor: '#2b2b2b',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure header is above all other elements
      }}
    >
      <Box display="flex" alignItems="center">
        {/* Avatar and Title in the Header */}
        <img
          src="path_to_avatar_image"
          alt="Avatar"
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            marginRight: '15px',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          CrossStudy
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;

