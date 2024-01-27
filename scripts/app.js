const express = require("express");
const app = express();
const port = 3000;

const apiRoutes = require("./api/routes"); // Update the path as needed
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
