'use client'
import { Button } from "@/components/ui/button";


export const handleSignOut = async () => {
  const response = await fetch("/api/sign-out", {
    method: "POST",
  });

  if (response.ok) {
    // Redirect to the sign-up page or any other desired page
    console.log("Successfully signed out");
  } else {
    console.error("Failed to sign out");
  }
};

export function SignOutButton() {
  return (
    <Button onClick={handleSignOut}>Sign Out</Button>
  );
  
}