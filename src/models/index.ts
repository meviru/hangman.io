import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export interface ICategory {
  id: number;
  name: string;
  words: string[];
}
