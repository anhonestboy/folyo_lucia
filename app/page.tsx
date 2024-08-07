import { signoutAction } from "@/actions/signout.action";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/sign-up");
	}
  return (
    <main>
      <h1>Hello World!</h1>
      <ModeToggle />
      <form action={signoutAction}>
        <button>SignOut</button>
      </form>
    </main>
  );
}
