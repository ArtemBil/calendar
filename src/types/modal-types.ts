import React from "react";

export type ActionsType = {
  id: string;
  actionInfo?: any;
  render(actionInfo?: any): React.ReactNode;
};

export enum LabelActions {
  CREATE = "label/create",
  UPDATE = "label/update",
}
