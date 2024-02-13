import { Team } from "@/models/teamModel";
import { User } from "@/models/userModel"; // Assuming you have a User model
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { teamId } = params;

  if (!teamId) {
    return NextResponse.json({ message: "Team not found", success: false });
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return NextResponse.json({ message: "Team not found", success: false });
    }

    // Fetch user details for each user ID in the users array
    const users = await User.find({ _id: { $in: team.users } }).select(
      "profileURL name isAdmin tagName email"
    );

    return NextResponse.json({
      data: users,
      message: "Users founded",
      success: true,
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error fetching users",
      success: false,
    });
  }
}
