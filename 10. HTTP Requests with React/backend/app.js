import fs from 'node:fs/promises'; // Import the File System module to handle file operations asynchronously

import bodyParser from 'body-parser'; // Import body-parser to help parse incoming request bodies
import express from 'express'; // Import Express framework

const app = express(); // Create an instance of an Express application

app.use(express.static('images')); // Serve static files from the 'images' folder
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// CORS

app.use((req, res, next) => {
  // Set header to allow all domains to access this server (CORS policy)
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  // Set header to allow certain HTTP methods from clients
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  // Set header to specify which headers can be sent in requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next(); // Proceed to the next middleware
});

app.get('/places', async (req, res) => {
  // Read the list of places from the JSON data file asynchronously
  const fileContent = await fs.readFile('./data/places.json');

  // Parse the file's JSON content into a JavaScript object/array
  const placesData = JSON.parse(fileContent);

  // Send back the places data as a JSON response with status 200 (OK)
  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  // Read the user-specific places from the JSON data file
  const fileContent = await fs.readFile('./data/user-places.json');

  // Parse the file's JSON content into a JavaScript object/array
  const places = JSON.parse(fileContent);

  // Respond with the user places as a JSON object, status 200 (OK)
  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  // Extract updated list of places from the request body
  const places = req.body.places;

  // Write the updated places back into the user-places JSON file
  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  // Respond to confirm the update was successful
  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  // If the request is for OPTIONS, pass to the next middleware (used for preflight requests)
  if (req.method === 'OPTIONS') {
    return next();
  }
  // If the route is not recognized, return a 404 error as a JSON response
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000); // Start the Express server on port 3000
