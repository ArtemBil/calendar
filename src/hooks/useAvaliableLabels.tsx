import { useAppDispatch, useAppSelector } from "@/hooks/store/hooks";
import React, { useState } from "react";
import { ActionsType, LabelActions } from "@/types/modal-types";
import { Button } from "@mui/material";
import { updateLabel } from "@/store/slices/labels-slice";

export default function useAvailableLabels() {
  const labels = useAppSelector((state) => state.labels);
  const [open, setOpen] = useState(false);
  const [currentLabelInfo, setCurrentLabelInfo] = useState<{
    id: string;
    name: string;
    color: string;
  }>({ id: "", name: "", color: "" });
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onLabelClick = (id: string, name: string, color: string) => (event) => {
    setCurrentLabelInfo((prevState) => ({ ...prevState, id, name, color }));
    handleOpen();
  };

  const handleLabelUpdate =
    (updatedInfo: { id: string; name: string; color: string }) => (event) => {
      dispatch(updateLabel(updatedInfo));
      handleClose();
    };

  const actions: ActionsType[] = [
    {
      id: LabelActions.UPDATE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={handleLabelUpdate(actionInfo)}>Update</Button>;
      },
    },
  ];

  return { open, labels, onLabelClick, handleClose, actions, currentLabelInfo };
}
