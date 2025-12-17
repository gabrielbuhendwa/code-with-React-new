export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  try {
    const resData = await response.json();
    return resData.places;
  } catch (error) {
    throw new Error('Failed to parse response. Make sure the backend server is running on port 3000.');
  }
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  try {
    const resData = await response.json();
    return resData.places;
  } catch (error) {
    throw new Error('Failed to parse response. Make sure the backend server is running on port 3000.');
  }
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  try {
    const resData = await response.json();
    return resData.message;
  } catch (error) {
    throw new Error('Failed to parse response. Make sure the backend server is running on port 3000.');
  }
}
