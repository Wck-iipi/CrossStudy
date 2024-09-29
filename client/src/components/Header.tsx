import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid #1976d2" }}>
      <Typography variant="h4" sx={{ color: "#fff" }}>
        Crates
      </Typography>
    </Box>
  );
};

export default Header;
