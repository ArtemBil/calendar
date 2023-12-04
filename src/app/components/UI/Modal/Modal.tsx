import React, { Fragment } from 'react';
import { Button } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';
import { ActionsType, OnModalClose } from '@/types/modal-types';
import {
  ButtonGroupActions,
  ModalContent,
  ModalHeader,
} from '@/app/components/UI/Modal/style';

interface ModalProps {
  header: string;
  open: boolean;
  handleClose: OnModalClose;
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
