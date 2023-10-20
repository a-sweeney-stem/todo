import { Dispatch, SetStateAction } from "react";

export interface OnSubmitProps {
  taskName: string;
  taskDescription: string;
  taskCompleted: boolean;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}
