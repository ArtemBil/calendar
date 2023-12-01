import { styled } from "@mui/system";
import { Box, ButtonGroup } from "@mui/material";

export const ModalHeader = styled(Box)({
  textAlign: "center",
  paddingBottom: "16px",
});

export const ModalContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "whitesmoke",
  border: "2px solid brown",
  boxShadow: "24px",
  padding: "24px",
  borderRadius: "5px",
});

export const ButtonGroupActions = styled(ButtonGroup)({
  display: "block",
  marginTop: "12px",
  width: "100%",
});
