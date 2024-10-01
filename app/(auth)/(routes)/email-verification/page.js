"use client";

import { FormSuccess } from "@/components/shared/FormSuccess";
import FormWrapper from "@/components/shared/FormWrapper";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EmailVerificationPage = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isValidEmail = async () => {
    if (!token) return;
    const res = await fetch(`/api/email-verification?token=${token}`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      setIsEmailValid(true);
      router.push("/");
    }
  };
  useEffect(() => {
    isValidEmail();
  }, []);
  return (
    <FormWrapper
      title="Verifying your email"
      description="please hold a second"
    >
      <div className="mt-4 text-muted-foreground flex items-center justify-center">
        {!isEmailValid ? (
          <Loader2 size={36} className="animate-spin" />
        ) : (
          <FormSuccess message="Email Verified Successfully" />
        )}
      </div>
    </FormWrapper>
  );
};

export default EmailVerificationPage;
