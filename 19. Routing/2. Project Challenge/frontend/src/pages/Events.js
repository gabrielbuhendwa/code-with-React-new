import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
      // Preserve the original status code from the backend
      const errorData = await response.json().catch(() => ({ message: 'Could not fetch events.' }));
      throw new Response(JSON.stringify({ message: errorData.message || 'Could not fetch events.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Parse and return the JSON data, not the Response object
      return response.json();
    }
  } catch (error) {
    // Handle network errors or other fetch failures
    if (error instanceof Response) {
      // Re-throw Response errors as-is
      throw error;
    }
    // Handle network errors (wrong URL, connection failed, etc.)
    throw new Response(JSON.stringify({ message: 'Failed to fetch events. Please check your connection.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
