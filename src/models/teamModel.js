const { default: mongoose } = require("mongoose");

const teamSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teamName: { type: String, required: true },
  purpose: { type: String, required: true },
  invitationCode: { type: String },
  teamAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


export const Team =
  mongoose.models.teams || mongoose.model("teams", teamSchema);
