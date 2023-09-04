import { Dispatch, SetStateAction } from "react";

export interface IDropdownMenuProps {
  buttonLabel: string;
  menuItems: string[];
  menuPaths: string[];
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
}
