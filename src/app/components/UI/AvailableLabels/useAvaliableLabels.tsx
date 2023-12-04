import { useAppDispatch, useAppSelector } from "@/hooks/store/hooks";
import React, { useState } from "react";
import { ActionsType, LabelActions } from "@/types/modal-types";
import { Button } from "@mui/material";
import {
  updateLabel,
  deletedLabel as deleteLabelAction,
} from "@/store/slices/labels-slice";
import { loadTasks } from "@/store/slices/tasks-slice";
import { LabelType } from "@/types/calendar-types";

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

  const onLabelClick = (id: string, name: string, color: string) => () => {
    setCurrentLabelInfo((prevState) => ({ ...prevState, id, name, color }));
    handleOpen();
  };

  const handleLabelUpdate =
    ({
      color,
      name,
      id,
      validate,
    }: {
      color: LabelType["color"];
      name: LabelType["name"];
      id: LabelType["id"];
      validate: () => boolean;
    }) =>
    () => {
      if (validate()) {
        handleClose();
        dispatch(updateLabel({ id, color, name })).then(() =>
          dispatch(loadTasks()),
        );
      }
    };

  const handleLabelDelete = (actionInfo: { id: string }) => () => {
    handleClose();
    dispatch(deleteLabelAction(actionInfo)).then(() => dispatch(loadTasks()));
  };

  const actions: ActionsType[] = [
    {
      id: LabelActions.UPDATE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={handleLabelUpdate(actionInfo)}>Update</Button>;
      },
    },
    {
      id: LabelActions.DELETE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={handleLabelDelete(actionInfo)}>Delete</Button>;
      },
    },
  ];

  return { open, labels, onLabelClick, handleClose, actions, currentLabelInfo };
}
