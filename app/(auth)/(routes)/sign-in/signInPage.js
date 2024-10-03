"use client";

import { FormError } from "@/components/shared/FormError";
import { FormSuccess } from "@/components/shared/FormSuccess";
import FormWrapper from "@/components/shared/FormWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message);
        // Wait for a short time to show the success message
        setTimeout(() => {
          if (data.hasPortfolio && data.username) {
            router.push(`/${data.username}`);
          } else {
            router.push("/create-portfolio");
          }
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch {
      toast.error("Sign-in failed");
    }
  };

  return (
    <FormWrapper
      title="Welcome back"
      description="Please enter your email and password to continue"
      linkLabel="Don't have an account?"
      linkHref="/sign-up"
    >
      <form className="space-y-4" onSubmit={submitHandler}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full"
          required
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full"
          required
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </form>
    </FormWrapper>
  );
}
