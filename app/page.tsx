import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-up");
  }
  return (
    <main>
      <h1>Hello World!</h1>
      <ModeToggle />
      <br />
      <SignOutButton />
    </main>
  );
}
