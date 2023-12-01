import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const AvailableLabelsList = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "32px",
});
export const AvailableLabelsListItem = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== "labelColor";
  },
})(({ labelColor }: { labelColor: string }) => ({
  backgroundColor: labelColor,
  padding: "12px",
  borderRadius: "24px",
  color: "white",
  fontSize: "14px",
  letterSpacing: ".8px",
}));
