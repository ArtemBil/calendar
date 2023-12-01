import { ActionsType } from "@/types/modal-types";
import React, { useState } from "react";
import { Button, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { LabelType } from "@/types/calendar-types";

export default function useTaskEditModal(
  handleUpdate: Function,
  content: string,
  labels: LabelType[],
) {
  const [taskContent, setTaskContent] = useState(content);
  const [taskLabels, setTaskLabels] = useState(labels || []);
  const allLabels = useSelector((state) => state.labels);
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setTaskLabels(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleInputChange = (event) => {
    setTaskContent(event.target.value);
  };

  const actions: ActionsType[] = [
    {
      render(): React.ReactNode {
        return (
          <Button onClick={handleUpdate(taskContent, taskLabels)}>
            Update
          </Button>
        );
      },
    },
  ];

  return {
    handleChange,
    handleInputChange,
    actions,
    taskLabels,
    taskContent,
    allLabels,
  };
}
