import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const CollapsibleContext = () => {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <Box
        sx={{
          alignSelf: "flex-end",
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          maxWidth: "40%",
          marginTop: "20px",
        }}
      >
        <Typography>--------- There is a context here ---------</Typography>
      </Box>
    )
  );
};

export default CollapsibleContext;
