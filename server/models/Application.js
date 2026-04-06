const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  appDate: { type: Date, required: true },
  status: { type: String, 
  enum: ["Applied", "Interviewing", "Rejected", "Offer Received"],
  required: true },
  notes: { type: String }
});

module.exports = mongoose.model("Application", applicationSchema);
