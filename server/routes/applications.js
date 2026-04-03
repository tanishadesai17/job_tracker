const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newApp = await Application.create(req.body);
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ error: "Failed to Create Application", details: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const apps = await Application.find();
    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({ error: "Failed to Retrieve Applications", details: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: "Not found" });
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: "Invalid Application ID", details: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Application Not Found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to Update Application", details: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({ message: "Application Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to Delete Application", details: err.message });
  }
});

module.exports = router;
