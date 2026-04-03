const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/jobtracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

const applicationRoutes = require("./routes/applications");
app.use("/applications", applicationRoutes);

//Test values
const Application = require("./models/Application");

async function seedDatabase() {
  const count = await Application.countDocuments();
  if (count === 0) {
    await Application.insertMany([
      {
        company: "Google",
        position: "Intern",
        appDate: "2026-01-01",
        status: "Applied",
        notes: "Test data"
      }
    ]);
    console.log("Test data inserted.");
  }
}

mongoose.connection.once("open", seedDatabase);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
