import React, { useState } from "react";
import { Button } from "@mui/material";
import LabelModal from "@/app/components/UI/LabelModal";
import { ActionsType, LabelActions } from "@/types/modal-types";
import { v1 as uuidv1 } from "uuid";
import { createLabel } from "@/store/slices/labels-slice";
import { useAppDispatch } from "@/hooks/store/hooks";

const CreateLabel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const handleSaveLabelClick =
    ({
      name,
      color,
      afterAction,
      validate,
    }: {
      name: string;
      color: string;
      afterAction: () => void;
      validate: () => boolean;
    }) =>
    () => {
      if (validate()) {
        handleClose();

        const id = uuidv1();
        dispatch(createLabel({ id, name, color }));

        afterAction();
      }
    };

  const actions: ActionsType[] = [
    {
      id: LabelActions.CREATE,
      render(actionInfo): React.ReactNode {
        return (
          <Button onClick={handleSaveLabelClick(actionInfo)}>Create</Button>
        );
      },
    },
  ];
  return (
    <>
      <Button onClick={handleOpen}>Create Label</Button>
      <LabelModal
        open={open}
        handleClose={handleClose}
        actions={actions}
        header="Create a label"
      />
    </>
  );
};

export default CreateLabel;
