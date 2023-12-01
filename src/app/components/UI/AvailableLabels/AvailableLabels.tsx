import React, { useState } from "react";
import { useAppSelector } from "@/hooks/store/hooks";
import { Box, Button } from "@mui/material";
import {
  AvailableLabelsList,
  AvailableLabelsListItem,
} from "@/app/components/UI/AvailableLabels/style";
import CreateLabelModal from "@/app/components/UI/CreateLabelModal";
import LabelModal from "@/app/components/UI/LabelModal";
import { ActionsType } from "@/types/modal-types";
import useAvailableLabels from "@/hooks/useAvaliableLabels";

const AvailableLabels = () => {
  const { open, labels, onLabelClick, handleClose, actions, currentLabelInfo } =
    useAvailableLabels();

  return (
    <>
      <AvailableLabelsList component="ul">
        {labels.map(({ id, name, color }) => (
          <>
            <AvailableLabelsListItem
              key={id}
              labelColor={color}
              onClick={onLabelClick(id, name, color)}
            >
              #{name}
            </AvailableLabelsListItem>
          </>
        ))}
      </AvailableLabelsList>
      <LabelModal
        header="Edit label"
        open={open}
        handleClose={handleClose}
        actions={actions}
        currentLabelInfo={currentLabelInfo}
      />
      {/*<CreateLabelModal open={open} handleClose={handleClose} />*/}
    </>
  );
};

export default AvailableLabels;
