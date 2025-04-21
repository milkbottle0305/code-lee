const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from code-lee-server!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
