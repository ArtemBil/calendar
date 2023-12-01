import React, { useState } from "react";
import { Button } from "@mui/material";
import LabelModal from "@/app/components/UI/LabelModal";
import { ActionsType, LabelActions } from "@/types/modal-types";
import { v1 as uuidv1 } from "uuid";
import { addLabel } from "@/store/slices/labels-slice";
import { useAppDispatch } from "@/hooks/store/hooks";
import { LabelType } from "@/types/calendar-types";

const CreateLabel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const handleSaveLabelClick =
    ({ name, color }: LabelType) =>
    (event) => {
      if (name && color) {
        const id = uuidv1();
        dispatch(addLabel({ id, name, color }));
      }

      handleClose();
    };

  const actions: ActionsType[] = [
    {
      id: LabelActions.CREATE,
      render(actionInfo): React.ReactNode {
        return (
          <Button onClick={handleSaveLabelClick(actionInfo)}>Create1</Button>
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
