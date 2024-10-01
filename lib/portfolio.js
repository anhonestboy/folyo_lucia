// lib/portfolio.js
import { PortfolioCollection } from '@/db';

export async function getUserPortfolio(userId) {
  const portfolio = await PortfolioCollection.findOne({ userId });
  return portfolio;
}

export async function createPortfolio(userId, username) {
  const portfolio = {
    userId,
    username,
    createdAt: new Date(),
  };
  const result = await PortfolioCollection.insertOne(portfolio);
  return result.insertedId;
}