import  RedirectToPortfolioPage from "./RedirectToPortfolio"
import CreatePortfolioPage from "./CreatePortfolio";
import { validateRequest } from "@/lib/auth";
import { PortfolioCollection } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CreatePortfolio() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      // Redirect to sign-in page if user is not authenticated
      redirect('/sign-in');
    }

    const existingPortfolio = await PortfolioCollection.findOne({ userId: user.id });

    if (existingPortfolio) {
      return (
        <main>
          <RedirectToPortfolioPage username={existingPortfolio.username} />
        </main>
      );
    }

    return (
      <main>
        <CreatePortfolioPage />
      </main>
    );
  } catch (error) {
    console.error("Error checking portfolio:", error);
    // Render an error message instead of returning null
    return (
      <main className="container text-center">
        <h1>An error occurred</h1>
        <p>We&apos;re sorry, but we couldn&apos;t process your request at this time. Please try again later.</p>
      </main>
    );
  }
}
