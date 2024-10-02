// components/SignOutButton.js (1-23)
'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  return async function handleSignOut() {
    try {
      const response = await fetch("/api/sign-out", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
        console.log("Successfully signed out");
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return handleSignOut;
};

export function SignOutButton({ className, variant }) {
  const handleSignOut = useSignOut();

  return (
    <Button onClick={handleSignOut} className={className} variant={variant}>
      Sign Out
    </Button>
  );
}
