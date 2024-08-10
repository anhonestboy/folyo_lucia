import { lucia } from "@/lib/auth";
import { UserCollection, VerificationTokenCollection } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if(token){
        const verificationToken = await VerificationTokenCollection.findOne({
            _id: token
        })

        if(!verificationToken || verificationToken.expires_at < new Date()){
            return new NextResponse(JSON.stringify({error: "Token not found or expired", success: false}));
        }

        await UserCollection.findOneAndUpdate({
            _id: verificationToken.user_id
        },{
            $set: {
                emailVerified: true
            }
        })

        // const session = await lucia.createSession(verificationToken.user_id, {});
	    // const sessionCookie = lucia.createSessionCookie(session.id);
        // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new NextResponse(JSON.stringify({success: true}));
    }

    return new NextResponse(JSON.stringify({error: "Token not found", success: false}));
}