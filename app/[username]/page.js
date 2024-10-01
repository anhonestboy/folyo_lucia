import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <main>
      Client Page
    </main>
  );
}
