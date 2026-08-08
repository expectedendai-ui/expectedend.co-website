import * as React from "react";
import { ContactForm } from "./contact-form";
import styles from "./style.module.css";

type ContactDialogProps = {
  initialReason: string;
  onClose: () => void;
  returnFocusTo: HTMLElement;
};

export function ContactDialog({ initialReason, onClose, returnFocusTo }: ContactDialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current?.focus();

    return () => returnFocusTo.focus();
  }, [returnFocusTo]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.contactDialog}
      aria-labelledby="contact-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} className={styles.contactDialogClose} type="button" aria-label="Close contact form" onClick={onClose}>
        ×
      </button>
      <ContactForm initialReason={initialReason} initialProject="A new idea" />
    </dialog>
  );
}
