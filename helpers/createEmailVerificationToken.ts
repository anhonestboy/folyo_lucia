import { VerificationTokenCollection } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { TimeSpan, createDate } from "oslo";

export async function createEmailVerificationToken(userId: string, email: string): Promise<string> {
    
	await VerificationTokenCollection.findOneAndDelete({
        user_id: userId
    })

	const tokenId = generateIdFromEntropySize(25);

	await VerificationTokenCollection.insertOne({
		_id: tokenId,
		user_id: userId,
		email,
		expires_at: createDate(new TimeSpan(2, "h"))
	})
    
	return tokenId;
}