import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpPage from "./signUpPage";

export default async function SignUp() {
  const { user } = await validateRequest();
console.log(user)
  if (!user) {
    return <SignUpPage />
  }
  return redirect("/");
}
