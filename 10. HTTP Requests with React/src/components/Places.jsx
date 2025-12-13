export default function Places({ title, places, fallbackText, onSelectPlace }) {
  console.log(places); // Log the current 'places' array to help with debugging and development

  return (
    <section className="places-category">
      <h2>{title}</h2> {/* Render the title of this places section */}
      {/* If there are no places, show the fallback text to inform the user */}
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {/* If there are places available, show them in a list */}
      {places.length > 0 && (
        <ul className="places">
          {/* Iterate over each place in the 'places' array and render a list item for each */}
          {places.map((place) => (
            <li key={place.id} className="place-item">
              {/* When the button is clicked, call the onSelectPlace handler with the selected place object */}
              <button onClick={() => onSelectPlace(place)}>
                {/* Display the place's image. 
                    The src is built from the local server path and the image filename (place.image.src)
                    The alt text is included for accessibility (place.image.alt) */}
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                {/* Show the place title under the image */}
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
