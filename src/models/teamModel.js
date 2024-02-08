const { default: mongoose } = require("mongoose");

const teamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  teamName: { type: String, required: true },
  purpose: { type: String },
  inviteId: { type: String },
});

export const Team =
  mongoose.models.teams || mongoose.model("teams", teamSchema);
