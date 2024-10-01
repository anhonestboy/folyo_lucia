import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInPage from "./signInPage";

export default async function SignIn() {
  const { user } = await validateRequest();

  if (!user) {
    return <SignInPage />
  }
  return redirect("/");
}
