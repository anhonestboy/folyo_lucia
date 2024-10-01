// app/api/check-portfolio/route.ts
import { validateRequest } from "@/lib/auth";
import { PortfolioCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user, session } = await validateRequest();

    if (!user || !session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const existingPortfolio = await PortfolioCollection.findOne({ userId: user.id });

    if (existingPortfolio) {
      return NextResponse.json({ 
        hasPortfolio: true, 
        username: existingPortfolio.username 
      });
    } else {
      return NextResponse.json({ hasPortfolio: false });
    }
  } catch (error) {
    console.error("Error checking portfolio:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}