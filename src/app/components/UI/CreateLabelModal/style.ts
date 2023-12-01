import { styled } from "@mui/system";
import { Box, ButtonGroup } from "@mui/material";

export const ColorPickerFieldContainer = styled(Box)({
  display: "flex",
  gap: "8px",
});
export const ColorPickerBox = styled(Box)({
  padding: "5px",
  background: "#fff",
  borderRadius: "1px",
  boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
  display: "inline-block",
  cursor: "pointer",
});

export const SelectedColorBox = styled(Box, {
  shouldForwardProp(propName: PropertyKey): propName is ForwardedProps {
    return propName !== "labelColor";
  },
})(({ labelColor }: { labelColor: string }) => ({
  width: "36px",
  height: "14px",
  borderRadius: "2px",
  background: labelColor,
}));

export const ColorPickerOverlay = styled(Box)({
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
});

export const ColorPickerContainer = styled(Box)({
  position: "absolute",
  zIndex: "2",
});
