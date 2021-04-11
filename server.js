const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//Set up config file
dotenv.config({ path: "./config/config.env" });
//Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR :${err.stack}`);
  console.log("Shutting dow the server due to Uncaught Exception");
  process.exit(1);
});
//connect Database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
process.on("unhandledRejection", (err) => {
  console.log(`ERROR :${err.message}`);
  console.log("Shutting dow the server due to Unhandled  Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
