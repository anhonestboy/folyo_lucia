import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientPage from "./ClientPage";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <main>
      <ClientPage />
    </main>
  );
}
