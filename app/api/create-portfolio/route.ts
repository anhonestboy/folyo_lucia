// app/api/create-portfolio/route.ts
import { lucia, validateRequest } from "@/lib/auth";
import { PortfolioCollection, PortfolioDoc } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    // Get the current user from the session
    const { user, session } = await validateRequest();

    if (!user || !session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Check if the username is already taken
    const existingPortfolio = await PortfolioCollection.findOne({ username });
    if (existingPortfolio) {
      return NextResponse.json({ success: false, message: "Username is already taken" }, { status: 400 });
    }

    // Create the new portfolio
    const newPortfolio: PortfolioDoc = {
      userId: user.id,
      username,
      createdAt: new Date()
    };

    const result = await PortfolioCollection.insertOne(newPortfolio);

    return NextResponse.json({ 
      success: true, 
      message: "Portfolio created successfully",
      portfolioId: result.insertedId
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}