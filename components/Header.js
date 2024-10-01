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

export default function Header({ user }) {
  const menuItems = [
    { name: "About", href: "/explore" },
    { name: "Explore", href: "/explore" },
  ]

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-4 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 self-start">
            <span className="sr-only">Folyo</span>
            <svg
              className="h-8 w-auto text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="m16 10-4 4-4-4" />
            </svg>
            <span className="text-xl font-bold">Folyo</span>
          </Link>

          <nav className="flex space-x-4 self-end">

            <div className="mr-3">
              <ModeToggle />
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase font-light tracking-widest text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            {user &&
              <SignOutButton className="text-xs uppercase font-light tracking-widest h-4 text-muted-foreground hover:text-primary" variant="ghost" />
            }
            {!user &&
              <Link href="/sign-in" className="text-xs uppercase font-light tracking-widest text-muted-foreground hover:text-primary">
                Sign in
              </Link>
            }


          </nav>



        </div>
      </div>
    </header>
  )
}