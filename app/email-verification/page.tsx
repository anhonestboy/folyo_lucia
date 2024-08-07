"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EmailVerificationPage = () => {
    const [isEmailValid, setIsEmailValid] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const isValidEmail = async () => {
        const res = await fetch(`/api/email-verification?token=${token}`, {method:"POST"})
        if(res.status === 200){
            setIsEmailValid(true);
            router.push("/")
        }
    }
    useEffect(() => {
        isValidEmail();
    }, [])
    return ( 
        <div>
            <h1>{!isEmailValid ? "Please wait we&apos;re verifying your email" : "Email Verified"}</h1>
        </div>
     );
}
 
export default EmailVerificationPage;