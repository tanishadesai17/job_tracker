const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  appDate: { type: Date, required: true },
  status: { type: String, 
  enum: ["Applied", "Interview", "Rejected", "Offer"],
  required: true },
  notes: { type: String }
});

module.exports = mongoose.model("Application", applicationSchema);
