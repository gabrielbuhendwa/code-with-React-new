import { useRef, useEffect } from 'react'; // Import necessary hooks from React
import { createPortal } from 'react-dom';  // Import createPortal for rendering modal outside component tree

function Modal({ open, children, onClose }) {
  const dialog = useRef(); // useRef to access the dialog DOM element

  useEffect(() => {
    // When the 'open' prop changes, show or close the modal dialog accordingly
    if (open) {
      dialog.current.showModal(); // Show the modal when 'open' is true
    } else {
      dialog.current.close(); // Close the modal when 'open' is false
    }
  }, [open]); // Dependency on 'open' to react to prop changes

  // Render the modal dialog inside the #modal element on the DOM using createPortal
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null} {/* Render children only if modal is open */}
    </dialog>,
    document.getElementById('modal') // Specify the DOM node where modal should appear
  );
}

export default Modal; // Export the Modal component for use in other files
