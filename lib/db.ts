// db.ts
import { Collection, MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

async () => {
  await client.connect();
}

export const db = client.db();
export const UserCollection = db.collection("users") as Collection<UserDoc>;
export const SessionCollection = db.collection("sessions") as Collection<SessionDoc>;
export const VerificationTokenCollection = db.collection("verificationTokens") as Collection<VerificationTokenDoc>;
export const PortfolioCollection = db.collection("portfolios") as Collection<PortfolioDoc>;

export interface PortfolioDoc {
  _id?: ObjectId;
  userId: string;
  username: string;
  createdAt: Date;
}

export interface UserDoc {
  _id: string;
  email: string;
  emailVerified: boolean;
  hashedPassword: string;
}

export interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

export interface VerificationTokenDoc {
  _id: string;
  user_id: string;
  email: string;
  expires_at: Date;
}