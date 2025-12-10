import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const records = [
    { emplName: "Kasia Masia", emplBirthday: "1884-12-31", emplSalary: 180000 },
    { emplName: "Asia Basia", emplBirthday: "1884-12-31", emplSalary: 180000 },
    {
      emplName: "Zosia Samosia",
      emplBirthday: "1884-12-31",
      emplSalary: 180000,
    },
    { emplName: "Kizia Misia", emplBirthday: "1884-12-31", emplSalary: 180000 },
    {
      emplName: "Andrzej Panda",
      emplBirthday: "1884-12-31",
      emplSalary: 180000,
    },
    { emplName: "Wanda Banda", emplBirthday: "1884-12-31", emplSalary: 180000 },
    { emplName: "Banda Panda", emplBirthday: "1884-12-31", emplSalary: 180000 },
    {
      emplName: "Cary Notagain",
      emplBirthday: "1884-12-31",
      emplSalary: 180000,
    },
    {
      emplName: "Barry Marry",
      emplBirthday: "1884-12-31",
      semplSalary: 180000,
    },
    { emplName: "Kara Mara", emplBirthday: "1884-12-31", emplSalary: 180000 },
  ];
  for (const record of records) {
    await createEmployee(record);
  }
  console.log("Database seeded successfully");
}
