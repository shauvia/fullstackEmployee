import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");
  console.log("req.body", req.body);

  const employeeToUCreate = {
    name: req.body.name,
    releaseDate: req.body.birthday,
    runningTime: req.body.salary,
  };
  if (
    !employeeToUCreate.name ||
    !employeeToUCreate.birthday ||
    !employeeToUCreate.salary
  ) {
    return res
      .status(400)
      .send("Missing required fields: name, releaseDate, salary");
  }

  const employee = await createEmployee(employeeToUCreate);

  if (!employee) {
    return res.status(404).json({ error: "employee not found" });
  }

  res.status(201).json(employee);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id < 0)
    return res
      .status(400)
      .json({ error: "Hey, you! The provided ID is not a positive integer!" });
  const employee = await getEmployee(id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: "The employee with the provided ID does not exist" });
  }
  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id < 0)
    return res
      .status(400)
      .json({ error: "Hey, you! The provided ID is not a positive integer!" });

  const employee = await deleteEmployee(id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: "The employee with the provided ID does not exist" });
  }
  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");
  console.log("req.body", req.body);
  const { id } = req.params;
  const { name, birthday, salary } = req.body;

  if (id < 0)
    return res
      .status(400)
      .json({ error: "Hey, you! The provided ID is not a positive integer!" });

  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = updateEmployee({ id, name, birthday, salary });

  if (!employee) {
    return res
      .status(404)
      .json({ error: "The employee with the provided ID does not exist" });
  }
  res.status(200).json(employee);
});
