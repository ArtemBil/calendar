import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SketchPicker } from "react-color";
import { useAppDispatch } from "@/hooks/store/hooks";
import { addLabel } from "@/store/slices/labels-slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// const labels = ["Urgent", "Medium", ""];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      position: "relative",
    },
  },
};

const UpdateLabelModal = ({ id, name, color, open, handleClose }) => {
  const [labelName, setLabelName] = useState<string>(name);
  const [labelColor, setLabelColor] = useState<string>(color);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (event) => {
    setLabelName(event.target.value);
  };

  const handleUpdateLabelClick = () => {
    if (labelColor && labelName) {
      dispatch(addLabel({ id, name: labelName, color: labelColor }));
    }

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title-edit"
      aria-describedby="modal-modal-description-edit"
    >
      <Box sx={{ ...style }}>
        <Box
          component="h3"
          sx={{
            textAlign: "center",
            pb: 2,
          }}
        >
          Update a label
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          Label Color (click to change):{" "}
          <Box
            sx={{
              padding: "5px",
              background: "#fff",
              borderRadius: "1px",
              boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => setColorPickerVisible(!colorPickerVisible)}
          >
            <Box
              sx={{
                width: "36px",
                height: "14px",
                borderRadius: "2px",
                background: labelColor,
              }}
            />
          </Box>
        </Box>
        {colorPickerVisible ? (
          <Box
            sx={{
              position: "absolute",
              zIndex: "2",
            }}
          >
            <Box
              sx={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={() => setColorPickerVisible(false)}
            />
            <SketchPicker
              disableAlpha={true}
              width="235px"
              color={labelColor}
              onChange={(color, event) => {
                setLabelColor(color.hex);
              }}
            />
          </Box>
        ) : null}

        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            id="standard-basic"
            label="Label name"
            required={false}
            variant="standard"
            value={labelName}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button onClick={handleUpdateLabelClick}>Update</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default UpdateLabelModal;
