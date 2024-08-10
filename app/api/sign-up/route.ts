import { createEmailVerificationToken } from "@/helpers/createEmailVerificationToken";
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
    const {email} = await req.json()

    const userId = generateIdFromEntropySize(10);

    const existingUser = await UserCollection.findOne({
        email
    })

    if(existingUser) {
        console.log("Email already in use");
        return new NextResponse(JSON.stringify({succes:false, message:"Email already in use"}))
    }

    await UserCollection.insertOne({
        _id: userId,
        email,
        emailVerified: false
    })

    const verificationToken = await createEmailVerificationToken(userId, email);
	const verificationLink = `http://localhost:3000/email-verification?token=${verificationToken}`;
	// await sendVerificationEmail(email, verificationLink);
    console.log(verificationLink);

    const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new NextResponse(JSON.stringify({success:true, message:"Verification Email Sent"}))
}