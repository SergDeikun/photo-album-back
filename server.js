const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 8080 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
