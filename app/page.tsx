import { validateRequest } from "@/lib/auth";
import Home from "@/components/Home"

export default async function HomePage() {
  const { user } = await validateRequest();


  return (
    <main>
      <Home user={user} />
    </main>
  );
}
