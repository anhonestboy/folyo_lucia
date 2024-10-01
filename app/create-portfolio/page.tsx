// app/create-portfolio/page.tsx
"use client";

import { FormError } from "@/components/shared/FormError";
import { FormSuccess } from "@/components/shared/FormSuccess";
import FormWrapper from "@/components/shared/FormWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePortfolioPage() {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkExistingPortfolio = async () => {
      try {
        const res = await fetch("/api/check-portfolio");
        const data = await res.json();
        if (data.hasPortfolio) {
          router.push(`/${data.username}`);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking portfolio:", error);
        setError("Failed to check existing portfolio");
        setIsLoading(false);
      }
    };

    checkExistingPortfolio();
  }, [router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/create-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Portfolio created successfully!");
        // Wait for a short time to show the success message
        setTimeout(() => {
          router.push(`/${username}`);
        }, 1500);
      } else {
        setError(data.message || "Failed to create portfolio");
      }
    } catch {
      toast.error("Failed to create portfolio");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormWrapper
      title="Create Your Portfolio"
      description="Choose a unique username for your portfolio"
    >
      <form className="space-y-4" onSubmit={submitHandler}>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your desired username"
          className="w-full"
          required
        />
        <Button type="submit" className="w-full">
          Create Portfolio
        </Button>
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </form>
    </FormWrapper>
  );
}