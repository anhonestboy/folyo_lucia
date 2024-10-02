import { validateRequest } from "@/lib/auth";
import Explore from "@/components/Explore"

export default async function HomePage() {
  const { user } = await validateRequest();


  return (
    <main>
      Explore
    </main>
  );
}
