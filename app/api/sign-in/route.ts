// app/api/sign-in/route.ts
import { createEmailVerificationToken } from "@/helpers/createEmailVerificationToken";
import { lucia } from "@/lib/auth";
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
  const { email } = await req.json();

  const existingUser = await UserCollection.findOne({
    email
  });

  if (!existingUser) {
    const response: SignInResponse = { 
      success: false, 
      message: "Email not found!", 
      hasPortfolio: false 
    };
    return NextResponse.json(response, { status: 400 });
  }

  const verificationToken = await createEmailVerificationToken(existingUser._id, email);
  const verificationLink = `http://localhost:3000/email-verification?token=${verificationToken}`;
  // await sendVerificationEmail(email, verificationLink);
  console.log(verificationLink);

  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  // Check if user has a portfolio
  const portfolio = await PortfolioCollection.findOne({ userId: existingUser._id });

  const response: SignInResponse = {
    success: true,
    message: "Verification Email Sent",
    hasPortfolio: !!portfolio,
    ...(portfolio && { username: portfolio.username })
  };

  return NextResponse.json(response);
}