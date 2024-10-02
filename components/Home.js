'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({user}) {
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
  
  return (
    <main>
      <h1>Hello World!</h1>
    </main>
  );
}
