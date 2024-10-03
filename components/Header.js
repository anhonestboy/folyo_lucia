'use client'
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/shared/ModeToggle";
import { SignOutButton } from "@/components/SignOutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ user }) {
  const router = useRouter();

  const menuItems = [
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
  ]

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

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/sign-out", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
        router.refresh(); // Force a refresh of the page
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-12 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 self-start">
            <span className="sr-only">Folyo</span>
            <span className="text-xl font-sans">Folyo</span>
          </Link>

          <nav className="flex space-x-4 self-end">
            <div className="mr-3">
              <ModeToggle />
            </div>

            {portfolio &&
              <Link href={`/${portfolio.username}`} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                Portfolio
              </Link>
            }

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase font-mono tracking-widest text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <Button
                onClick={handleSignOut}
                className="text-xs uppercase font-mono tracking-widest h-4 text-muted-foreground hover:text-primary"
                variant="ghost"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                  Sign in
                </Link>
                <Link href="/sign-up" className="underline text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}