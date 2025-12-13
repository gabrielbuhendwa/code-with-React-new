import { useEffect } from 'react';

import ProgressBar from './ProgressBar.jsx'; // Import ProgressBar component for showing the timeout visually

const TIMER = 3000; // Set the countdown timer value to 3000 milliseconds (3 seconds)

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    // Start a timeout when the component mounts to auto-confirm after TIMER ms
    const timer = setTimeout(() => {
      onConfirm(); // Automatically call onConfirm after the timer elapses
    }, TIMER);

    // Clean up the timer if the component unmounts or dependencies change
    return () => {
      clearTimeout(timer); // Clear the timeout to avoid calling onConfirm if not needed
    };
  }, [onConfirm]); // Depend on onConfirm to re-sync if the callback changes

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        {/* If the user clicks "No", call the provided onCancel handler */}
        <button onClick={onCancel} className="button-text">
          No
        </button>
        {/* If the user clicks "Yes", immediately call the onConfirm handler */}
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Show a progress bar that fills for TIMER ms, indicating how long before auto-confirm */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
