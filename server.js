const express = require("express");
const path = require("path");
const multer = require("multer");

const server = express();

// Middleware for parsing multipart/form-data
const upload = multer();

// Serve static files from the "public" folder
server.use(express.static(path.join(__dirname, "public")));

// -------------- DO NOT TOUCH --------------------

// Handle "/say-hello" POST requests
server.post("/say-hello", upload.none(), (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response
      .status(400)
      .json({ error: "Name is required in the request body." });
  }

  response.status(200).json({ message: `Hello, my name is ${body.name}` });
});

// Handle "/server2.js" POST requests
server.post("/server2.js", upload.none(), (request, response) => {
  const { name, phone } = request.body;

  if (!name || !phone) {
    return response
      .status(400)
      .json({ error: "Both 'name' and 'phone' are required." });
  }

  console.log("Received body:", request.body);

  response.status(200).json({ message: `Name: ${name}, Phone: ${phone}` });
});

// -------------- DO NOT TOUCH --------------------

// Set the port (default to 3000 if not provided)
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
