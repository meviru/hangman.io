import styled from "styled-components";
import { ModalProps } from "../../models";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 20px;
  z-index: 1001;
  max-width: 520px;
  border-radius: 30px;
  padding: 20px 20px 55px;
  transform: translate(-50%, -50%);
  background-color: rgba(38, 59, 116, 0.8);
  box-shadow: inset 4px -20px 2px rgba(0, 0, 0, 0.15),
    inset -4px -15px 2px rgba(0, 0, 0, 0.15),
    inset 4px -4px 2px ${({ theme }) => theme.darkBlue},
    inset -4px 4px 2px #4a64b5,
    7px 7px 15px ${({ theme }) => theme.darkBlue};
`;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay style={{ display: isOpen ? "block" : "none" }} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
