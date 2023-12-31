import React from 'react';
import { Box, Button, Popover } from '@mui/material';
import { ActionsContainer } from '@/app/components/UI/CalendarActions/style';

interface CalendarActionsProps {
  children: React.ReactNode;
}

const CalendarActions: React.FC<CalendarActionsProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Actions
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          <ActionsContainer>{children}</ActionsContainer>
        </Popover>
      </Box>
    </>
  );
};

export default CalendarActions;
