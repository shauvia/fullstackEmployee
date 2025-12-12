import express from "express";
const app = express();
export default app;

import employeesRouter from "#api/employees";
// Body-parsing middleware
app.use(express.json());

// Logging middleware = just log all of the requests that come through

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// TODO: route /movies to movies router
app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
