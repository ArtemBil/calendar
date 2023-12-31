import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { week } from '@/utils/calendar';

export const WeekDaysList = styled(Box)({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'space-between',
  textAlign: 'center',
  gap: '6px',
});

export const WeekDaysListItem = styled(Box, {
  shouldForwardProp(propName: PropertyKey): boolean {
    return propName !== 'weekDays';
  },
})(({ weekDays }: { weekDays: typeof week }) => ({
  flexBasis: `calc(100% / ${weekDays.length})`,
  padding: '12px',
  borderBottom: '4px solid #E2E4E6',
  borderRadius: '50px',
}));
