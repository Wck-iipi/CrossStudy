import React from "react";
import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import EventIcon from "@mui/icons-material/Event";

const Sidebar = () => {
  return (
    <Box sx={{ backgroundColor: "#232323", padding: "10px", textAlign: "center", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", marginTop: "20px" }}>
        <IconButton sx={{ color: "#fff" }}>
          <HomeIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <QuizIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <EventIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
