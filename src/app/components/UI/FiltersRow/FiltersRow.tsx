import React from "react";
import { Box } from "@mui/material";
import { FiltersRowContainer } from "@/app/components/UI/FiltersRow/style";

interface FiltersRowProps {
  children: React.ReactNode;
}

const FiltersRow: React.FC<FiltersRowProps> = ({ children }) => {
  return (
    <Box>
      <Box>Filters</Box>
      <FiltersRowContainer>{children}</FiltersRowContainer>
    </Box>
  );
};

export default FiltersRow;
