import { validateRequest } from "@/lib/auth";
import About from "@/components/About"

export default async function HomePage() {
  const { user } = await validateRequest();


  return (
    <main>
      About
    </main>
  );
}
