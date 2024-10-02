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

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase font-mono tracking-widest text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            {user &&
              <SignOutButton className="text-xs uppercase font-mono tracking-widest h-4 text-muted-foreground hover:text-primary" variant="ghost" />
            }
            {!user &&
              <Link href="/sign-in" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                Sign in
              </Link>
            }


          </nav>



        </div>
      </div>
    </header>
  )
}