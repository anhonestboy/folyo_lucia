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
    </main>
  );
}
