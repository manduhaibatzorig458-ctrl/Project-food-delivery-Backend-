import express from "express";

const app = express();

const PORT = 1000;

app.get("/", (request, response) => {
  response.json({
    message: `Hello api is running on port ${PORT}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
