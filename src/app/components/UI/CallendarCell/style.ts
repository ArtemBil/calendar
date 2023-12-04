import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const ListItem = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return !['isActive', 'weekDays', 'isToday', 'isOver'].includes(
      propName as string,
    );
  },
})(
  (props: {
    isActive: boolean;
    weekDays: string[];
    isToday: boolean | undefined;
    isOver: boolean;
  }) => ({
    background: props.isToday ? '#bcbec0' : '#E2E4E6',
    height: 200,
    padding: '8px',
    border: props.isOver ? '2px dotted blue' : '2px solid #EEEFF1',
    borderRadius: '8px',
    overflow: 'auto',
    cursor: 'pointer',
    opacity: props.isActive ? 1 : 0.5,
    flexBasis: `calc(100% / ${props.weekDays.length})`,
  }),
);

export const CalendarCellDay = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'isActive';
  },
})((props: { isActive: boolean | undefined }) => ({
  fontWeight: props.isActive ? 'bold' : 'normal',
  marginRight: '8px',
}));

export const CalendarCellCardCounter = styled(Box)({
  fontSize: '12px',
  opacity: 0.7,
  fontWeight: 600,
});

export const CalendarCellHeaderBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
