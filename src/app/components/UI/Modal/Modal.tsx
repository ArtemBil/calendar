import React, { Fragment } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import { ActionsType } from "@/types/modal-types";
import {
  ButtonGroupActions,
  ModalContent,
  ModalHeader,
} from "@/app/components/UI/Modal/style";

interface ModalProps {
  header: string;
  open: boolean;
  handleClose: Function;
  actions: ActionsType[];
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  actions,
  children,
  header,
}) => {
  console.log(actions);
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title-edit"
      aria-describedby="modal-modal-description-edit"
    >
      <ModalContent>
        <ModalHeader component="h3">{header}</ModalHeader>
        {children}

        <ButtonGroupActions>
          {actions.map(({ render, actionInfo }, index) => (
            <Fragment key={index}>{render(actionInfo)}</Fragment>
          ))}
          <Button onClick={handleClose}>Cancel</Button>
        </ButtonGroupActions>
      </ModalContent>
    </MuiModal>
  );
};

export default Modal;
