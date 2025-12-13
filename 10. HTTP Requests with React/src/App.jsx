import { useRef, useState, useCallback } from 'react'; // Import React hooks for state, refs, and memoized functions

import Places from './components/Places.jsx'; // Import the Places component to render a list of places the user selected
import Modal from './components/Modal.jsx'; // Import Modal component for showing dialogs
import DeleteConfirmation from './components/DeleteConfirmation.jsx'; // Import confirmation dialog for deleting places
import logoImg from './assets/logo.png'; // Import the logo image for header
import AvailablePlaces from './components/AvailablePlaces.jsx'; // Import the component that lets users pick new places

function App() {
  // A ref to track which place the user wants to remove (persists without causing re-renders)
  const selectedPlace = useRef();

  // State for the array of places the user picked
  const [userPlaces, setUserPlaces] = useState([]);

  // State to control whether the modal dialog is visible
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function called when user starts to remove a place
  function handleStartRemovePlace(place) {
    setModalIsOpen(true); // Show the modal dialog for confirmation
    selectedPlace.current = place; // Save the selected place to be removed
  }

  // Function called when user cancels or finishes removing a place
  function handleStopRemovePlace() {
    setModalIsOpen(false); // Hide the modal dialog
  }

  // Function called when the user selects a new place to add to their personal list
  function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      // If the state is undefined/null, set it to an empty array
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      // If the selected place is already in list, return current list (avoid duplicates)
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      // Otherwise, add the new place at the start of the array
      return [selectedPlace, ...prevPickedPlaces];
    });
  }

  // Memoized (with useCallback) function to remove the selected place from user's list
  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    // Remove the place whose id matches the selected place ref
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false); // Close the modal dialog after deleting
  }, []);

  return (
    <>
      {/* Modal dialog appears when modalIsOpen is true */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}  // Click "No" cancels remove and closes modal
          onConfirm={handleRemovePlace}     // Click "Yes" or auto-timeout triggers actual remove
        />
      </Modal>

      {/* Header with logo and introductory text */}
      <header>
        <img src={logoImg} alt="Stylized globe" /> {/* Logo image */}
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {/* This component displays the list of places the user has selected */}
        <Places
          title="I'd like to visit ..." // Section title
          fallbackText="Select the places you would like to visit below." // Shown if no places selected
          places={userPlaces} // List of picked places to render
          onSelectPlace={handleStartRemovePlace} // Handles starting the remove-flow when user clicks a place
        />

        {/* This component lets the user select from a wider list of available places */}
        <AvailablePlaces onSelectPlace={handleSelectPlace} /> {/* Called when user picks a new place */}
      </main>
    </>
  );
}

export default App; // Export App as default so it can be used in index.jsx etc.
