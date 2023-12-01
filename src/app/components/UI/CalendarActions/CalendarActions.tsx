import React, { useState } from "react";
import { Box, Button, Drawer, Popover, Typography } from "@mui/material";

interface CalendarActionsProps {
  children: React.ReactNode;
}

const CalendarActions: React.FC<CalendarActionsProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Actions
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {children}
          </Box>
        </Popover>
      </div>
    </>
  );
};

export default CalendarActions;
