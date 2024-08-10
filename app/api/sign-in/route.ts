import { createEmailVerificationToken } from "@/helpers/createEmailVerificationToken";
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
    const {email} = await req.json()

    const existingUser = await UserCollection.findOne({
        email
    })

    if(!existingUser) {
        return new NextResponse(JSON.stringify({succes:false, message:"Email not exists!"}))
    }

    console.log(existingUser);

    const verificationToken = await createEmailVerificationToken(existingUser._id,email);
	const verificationLink = `http://localhost:3000/email-verification?token=${verificationToken}`;
	// await sendVerificationEmail(email, verificationLink);
    console.log(verificationLink);

    const session = await lucia.createSession(existingUser._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new NextResponse(JSON.stringify({success:true, message:"Verification Email Sent"}))
}