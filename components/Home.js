'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Home({ user }) {
  const router = useRouter();

  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkExistingPortfolio = async () => {
      try {
        const res = await fetch("/api/check-portfolio");
        const data = await res.json();
        if (data.hasPortfolio) {
          setPortfolio(data.portfolioInfo)
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking portfolio:", error);
        setError("Failed to check existing portfolio");
        setIsLoading(false);
      }
    };
    checkExistingPortfolio();
  }, [user]);


  if (portfolio) {
    router.push("/" + portfolio.username);
  }

  if (user && !portfolio) {
    router.push("/create-portfolio");
  }

  return (
    <main>
      <div className="container mx-auto px-8 pt-16">
        <h1 className="text-6xl font-bold font-sans pb-8">Folyo. Your landing portfolio.</h1>
        <div className="w-6/12 pb-8">
          <p className="font-mono font-light pb-4">Folyo is the ultimate mini portfolio platform for photographers who want to showcase their best work in a sleek, professional format.</p>
          <p className="font-mono font-light">Pin your favorite photographers and create your personalized gallery. Discover new talent, save inspiring works, and build a visual collection that fuels your creativity.</p>
        </div>

        <Button
          size="lg"
          className="group hover:scale-105 text-2xl font-bold py-8 px-12 rounded-full transition-all duration-200 border-8" 
          href="/sign-in"
          >
          Get started
          <span className="mt-[1px] group-hover:opacity-100 opacity-0 duration-200 group-hover:translate-x-3 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color="currentColor" fill={"none"}>
              <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Button>
      </div>
    </main>
  );
}
