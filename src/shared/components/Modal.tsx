import styled from "styled-components";
import { ModalProps } from "../../models";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const ModalContainer = styled(motion.div)`
  width: 100%;
  padding: 20px;
  z-index: 1001;
  max-width: 520px;
  border-radius: 30px;
  padding: 55px 20px;
  background-color: rgba(38, 59, 116, 0.9);
  box-shadow: inset 4px -20px 2px rgba(0, 0, 0, 0.15),
    inset -4px -15px 2px rgba(0, 0, 0, 0.15),
    inset 4px -4px 2px ${({ theme }) => theme.darkBlue},
    inset -4px 4px 2px #4a64b5, 7px 7px 15px ${({ theme }) => theme.darkBlue};
  @media (max-width: 767px) {
    padding: 45px 20px;
  }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.3,
            },
          }}
          onClick={onClose}
        >
          <ModalContainer
            key="modal"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: 0.3,
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
