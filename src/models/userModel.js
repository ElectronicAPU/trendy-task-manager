import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profileURL: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    isAdmin: { type: Boolean, default: false },
    tagName: { type: [String], default: ["employee"] },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
