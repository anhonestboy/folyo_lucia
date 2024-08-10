"use client";

import { FormError } from "@/components/shared/FormError";
import { FormSuccess } from "@/components/shared/FormSuccess";
import FormWrapper from "@/components/shared/FormWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success === true) {
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch {
      toast.error("Signup failed");
    }
  };

  return (
    <FormWrapper
      title="Welcome"
      description="Please enter your email to continue"
      social
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
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </form>
    </FormWrapper>
  );
};

export default SignInPage;
