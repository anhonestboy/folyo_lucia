"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RedirectToPortfolioPage({ username }) {
  const router = useRouter();
  router.push(`/${username}`);

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)] font-mono">
      <p className="ml-4">Your portfolio page is already created.</p>
      <Link href={`/${username}`} className="group">navigate to <span className="group-hover:underline">/{username}</span></Link>
    </div>
  );




}