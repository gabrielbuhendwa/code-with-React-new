import Places from './Places.jsx'; // Import the Places component that is responsible for displaying a list of places

// Define and export the AvailablePlaces component.
// It takes in an 'onSelectPlace' function prop used to handle selection of a place.
export default function AvailablePlaces({ onSelectPlace }) {
  return (
    <Places
      title="Available Places"           // Set the title prop for list heading
      places={[]}                        // Provide an empty array since there are no places to show yet
      fallbackText="No places available." // Text to display when there are no places
      onSelectPlace={onSelectPlace}      // Pass down the handler for place selection
    />
  );
}
