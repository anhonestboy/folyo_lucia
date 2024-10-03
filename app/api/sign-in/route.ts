// app/api/sign-in/route.ts
import { lucia, verifyPassword } from "@/lib/auth";
import { UserCollection, PortfolioCollection } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface SignInResponse {
  success: boolean;
  message: string;
  hasPortfolio: boolean;
  username?: string;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    const response: SignInResponse = { 
      success: false, 
      message: "Email and password are required", 
      hasPortfolio: false 
    };
    return NextResponse.json(response, { status: 400 });
  }

  const existingUser = await UserCollection.findOne({ email });

  if (!existingUser) {
    const response: SignInResponse = { 
      success: false, 
      message: "Invalid email or password", 
      hasPortfolio: false 
    };
    return NextResponse.json(response, { status: 400 });
  }

  const isPasswordValid = await verifyPassword(existingUser.hashedPassword, password);

  if (!isPasswordValid) {
    const response: SignInResponse = { 
      success: false, 
      message: "Invalid email or password", 
      hasPortfolio: false 
    };
    return NextResponse.json(response, { status: 400 });
  }

  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  // Check if user has a portfolio
  const portfolio = await PortfolioCollection.findOne({ userId: existingUser._id });

  const response: SignInResponse = {
    success: true,
    message: "Sign in successful",
    hasPortfolio: !!portfolio,
    ...(portfolio && { username: portfolio.username })
  };

  return NextResponse.json(response);
}