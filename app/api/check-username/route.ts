import { NextResponse } from "next/server";
import { PortfolioCollection } from "@/lib/db";

const reservedUsernames = [
  'admin', 'explore', 'about', 'contact', 'contacts', 'signin', 'signout',
  'login', 'logout', 'signup', 'register', 'help', 'support', 'terms',
  'privacy', 'settings', 'profile', 'dashboard', 'api', 'static', 'public',
  'backoffice', 'edit', 'gallery', 'moodboard', 'account', 'getstarted',
  'pricing', 'blog', 'news', 'updates', 'team', 'careers', 'jobs',
  'developers', 'docs', 'documentation', 'community', 'forum', 'chat',
  'store', 'shop', 'checkout', 'cart', 'buy', 'purchase', 'subscribe',
  'newsletter', 'resources', 'tools', 'utilities', 'apps', 'services',
  'products', 'solutions', 'features', 'company', 'business', 'enterprise',
  'corporate', 'partners', 'affiliates', 'vendors', 'suppliers', 'clients',
  'customers', 'users', 'members', 'investors', 'media', 'press', 'articles',
  'guides', 'tutorials', 'faq', 'search', 'home', 'index', 'root', 'auth',
  'secure', 'private', 'redirect', 'callback', 'error', 'debug', 'test',
  'dev', 'staging', 'prod', 'production', 'www'
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ available: false, error: "Username is required" }, { status: 400 });
  }

  const lowercaseUsername = username.toLowerCase();

  // Check username length
  if (lowercaseUsername.length < 5) {
    return NextResponse.json({ available: false, error: "Username must be at least 5 characters long" });
  }

  // Check for special characters
  if (!/^[a-z0-9]+$/.test(lowercaseUsername)) {
    return NextResponse.json({ available: false, error: "Username can only contain letters and numbers" });
  }

  // Check if the username is in the reserved list
  if (reservedUsernames.includes(lowercaseUsername)) {
    return NextResponse.json({ available: false, error: "This username is reserved" });
  }

  try {
    const existingPortfolio = await PortfolioCollection.findOne({ username: lowercaseUsername });
    const isAvailable = !existingPortfolio;

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json({ available: false, error: "Internal server error" }, { status: 500 });
  }
}