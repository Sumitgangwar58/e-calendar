import React, { useEffect, useRef } from "react";
import "./Modal.css";
import { X } from "react-feather";

interface ModalI {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  title?: string;
}

const Modal = ({ open, onClose, content, title }: ModalI) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handelClickOutside = (e: MouseEvent) => {
    if (!modalRef.current) return;

    if (!modalRef.current.contains(e.target as Node)) onClose();
  };

  useEffect(() => {
    if (!open) return;
    window.addEventListener("click", handelClickOutside, true);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("click", handelClickOutside, true);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        <>
          <div className="modal-before"></div>
          <div ref={modalRef} className="modal">
            <div className="modal-header">
              <span>{title ? title : "Heading"}</span>
              <div onClick={onClose} className="modal-close-button">
                <X />
              </div>
            </div>

            {content}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
