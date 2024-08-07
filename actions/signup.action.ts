"use server";

import { createEmailVerificationToken } from "@/helpers/createEmailVerificationToken";
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";

export const signupAction = async (formData:FormData) => {
    const email = formData.get("email") as string;

    const userId = generateIdFromEntropySize(10);

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
	return redirect("/verification-email-sent")
}