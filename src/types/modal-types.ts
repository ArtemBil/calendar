import React, { MouseEventHandler } from 'react';

export type ActionsType = {
  id: string;
  actionInfo?: any;
  render(actionInfo?: any): React.ReactNode;
};

export type OnModalClose = (
  event:
    | {}
    | React.MouseEvent<HTMLDivElement>
    | MouseEventHandler<HTMLAnchorElement>,
  reason?: 'backdropClick' | 'escapeKeyDown',
) => void;

export enum LabelActions {
  CREATE = 'label/create',
  UPDATE = 'label/update',
  DELETE = 'label/delete',
}

export enum TaskActions {
  CREATE = 'task/create',
  UPDATE = 'task/update',
  DELETE = 'task/delete',
}
