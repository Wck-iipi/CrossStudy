import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Box, Typography, Paper, Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import QuizIcon from '@mui/icons-material/Quiz';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Sidebar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Toggle for content expansion
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Toggle for sidebar collapse

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box
      sx={{
        width: isSidebarCollapsed ? '60px' : '220px', // Adjust width based on collapse state
        backgroundColor: '#3a3a3a',
        height: '100vh',
        paddingTop: '50px', // Adding space for the fixed header
        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: isSidebarCollapsed ? 'center' : 'flex-start', // Center items when collapsed
        textAlign: 'left',
        transition: 'width 0.3s ease', // Smooth transition for collapse
      }}
    >
      {/* Hamburger Icon to Collapse/Expand Sidebar */}
      <IconButton
        sx={{ color: '#fff', marginLeft: isSidebarCollapsed ? '0' : '16px' }}
        onClick={toggleSidebarCollapse}
      >
        <MenuIcon />
      </IconButton>

      {!isSidebarCollapsed && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#4b4b4b',
            padding: '10px',
            width: '90%',
            margin: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Drop Down Icon (Toggle) */}
          <IconButton sx={{ color: '#fff' }} onClick={toggleExpand}>
            {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </IconButton>

          {/* Text Display - Conditionally Rendered Based on `isExpanded` */}
          {isExpanded ? (
            <Typography
              variant="body2"
              sx={{ color: '#fff', flexGrow: 1, marginLeft: '8px', marginRight: '8px' }}
            >
              Lorem Ipsum dsagajdask dfas dsg adsf gdsf aq as f'd sa fds gsd q asdd s adsg as dsg a dsd.
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: '#fff', flexGrow: 1, marginLeft: '8px', marginRight: '8px' }}
            >
              Lorem Ipsum
            </Typography>
          )}

          {/* Right Three Dots Icon */}
          <IconButton sx={{ color: '#fff' }} onClick={handleMenuOpen}>
            <MoreHorizIcon />
          </IconButton>
        </Paper>
      )}

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#4b4b4b', // Set background to match the sidebar
            color: '#fff',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ShareIcon sx={{ color: '#fff', marginRight: '8px' }} />
          <Typography sx={{ color: '#fff' }}>Share</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ color: '#fff', marginRight: '8px' }} />
          <Typography sx={{ color: '#fff' }}>Rename</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <FileCopyIcon sx={{ color: '#fff', marginRight: '8px' }} />
          <Typography sx={{ color: '#fff' }}>Extract</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <QuizIcon sx={{ color: '#fff', marginRight: '8px' }} />
          <Typography sx={{ color: '#fff' }}>Quiz</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DescriptionIcon sx={{ color: '#fff', marginRight: '8px' }} />
          <Typography sx={{ color: '#fff' }}>
            Summary</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Sidebar;
