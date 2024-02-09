// Import necessary modules and utility functions
import { Team } from "@/models/teamModel";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { findToken, findUser } from "@/utils/userHandlling";

// @desc    Create a Team
// @api     POST /api/users/admin/team
// @access  Private/Admin
export async function POST(req) {
  try {
    // Parse the request body to extract teamName and purpose
    const { teamName, purpose } = await req.json();

    const token = await findToken(req);
    const currUser = await findUser(token);

    // Check if all required fields are provided
    if (!teamName || !purpose) {
      return NextResponse.json(
        { message: "Please provide all the required fields.", success: false },
        { status: 400 }
      );
    }

    // Check if the user exists and is an admin
    if (!currUser || !currUser.isAdmin) {
      return NextResponse.json(
        { message: "User not found or not authorized.", success: false },
        { status: 403 }
      );
    }

    // Generate a unique invitation code
    const nanoUUID = nanoid();

    // Create a new team instance
    const team = new Team({
      users: [currUser._id],
      teamName,
      purpose,
      teamAdmin: currUser._id,
      invitationCode: nanoUUID,
    });

    // Save the team to the database
    await team.save();

    // Return a success response
    return NextResponse.json({
      message: "Team created successfully",
      success: true,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating team:", error);
    return NextResponse.json(
      { message: "Failed to create a team", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const teams = await Team.find();
    return NextResponse.json(
      { data: teams, message: "Successfull fetch teams", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { message: "Failed to fetch teams", success: false },
      { status: 500 }
    );
  }
}
