import { useLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useLoaderData();

  return (
    <EventItem event={data.event} />
  );
}

export default EventDetailPage;

export async function loader({request, params}) {
  const id = params.eventId;

  try {
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
      // Preserve the original status code from the backend
      const errorData = await response.json().catch(() => ({ message: 'Could not fetch event details.' }));
      throw new Response(JSON.stringify({ message: errorData.message || 'Could not fetch event details.' }), {
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
    throw new Response(JSON.stringify({ message: 'Failed to fetch event details. Please check your connection.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}