"use client";

import { FormError } from "@/components/shared/FormError";
import { FormSuccess } from "@/components/shared/FormSuccess";
import FormWrapper from "@/components/shared/FormWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Custom debounce function with type annotations
const debounce = <F extends (...args: any[]) => void>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const reservedUsernames = [
  'admin', 'explore', 'about', 'contact', 'contacts', 'signin', 'signout',
  'login', 'logout', 'signup', 'register', 'help', 'support', 'terms',
  'privacy', 'settings', 'profile', 'dashboard', 'api', 'static', 'public',
  'backoffice', 'edit', 'gallery', 'moodboard', 'account', 'getstarted',
  'pricing', 'blog', 'news', 'updates', 'team', 'careers', 'jobs',
  'developers', 'docs', 'documentation', 'community', 'forum', 'chat',
  'store', 'shop', 'checkout', 'cart', 'buy', 'purchase', 'subscribe',
  'newsletter', 'resources', 'tools', 'utilities', 'apps', 'services',
  'products', 'solutions', 'features', 'company', 'business', 'enterprise',
  'corporate', 'partners', 'affiliates', 'vendors', 'suppliers', 'clients',
  'customers', 'users', 'members', 'investors', 'media', 'press', 'articles',
  'guides', 'tutorials', 'faq', 'search', 'home', 'index', 'root', 'auth',
  'secure', 'private', 'redirect', 'callback', 'error', 'debug', 'test',
  'dev', 'staging', 'prod', 'production', 'www'
];

const isValidUsername = (username: string): boolean => {
  return username.length >= 5 && /^[a-z0-9]+$/.test(username);
};

export default function CreatePortfolioPage() {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
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

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username) {
      setIsUsernameAvailable(null);
      setError("");
      return;
    }

    setIsCheckingUsername(true);
    
    if (!isValidUsername(username)) {
      setIsUsernameAvailable(false);
      setError("Username must be at least 5 characters long and contain only letters and numbers.");
      setIsCheckingUsername(false);
      return;
    }

    if (reservedUsernames.includes(username.toLowerCase())) {
      setIsUsernameAvailable(false);
      setError("This username is reserved and cannot be used.");
      setIsCheckingUsername(false);
      return;
    }

    try {
      const res = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
      const data = await res.json();
      setIsUsernameAvailable(data.available);
      if (!data.available) {
        setError(data.error || "This username is not available.");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      setIsUsernameAvailable(null);
      setError("Failed to check username availability.");
    } finally {
      setIsCheckingUsername(false);
    }
  }, []);

  const debouncedCheckUsername = useCallback(
    debounce((username: string) => checkUsernameAvailability(username), 300),
    [checkUsernameAvailability]
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setError(""); // Clear any previous errors
    debouncedCheckUsername(newUsername);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!isUsernameAvailable) {
      setError("This username is not available. Please choose another one.");
      return;
    }
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
    <div className="container mx-auto px-4 w-6/12 h-[calc(100vh-150px)] flex flex-col items-center justify-center">
      <form className="space-y-4 w-full" onSubmit={submitHandler}>
        <div className="relative">
          <Input
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your desired username, this will be your unique link"
            className="bg-white dark:bg-black focus:scale-105 duration-200 transition-all p-10 text-xl font-extralight border-t-0 active:border-none border-x-0 border-b-2 border-backgroundAlt shadow-2xl rounded-lg dark:shadow-white/5"
            required
          />
          {isCheckingUsername && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              Checking...
            </span>
          )}
          {!isCheckingUsername && isUsernameAvailable !== null && (
            <span
              className={`absolute right-12 top-1/2 transform -translate-y-1/2 font-mono text-sm ${
                isUsernameAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUsernameAvailable ? "Available" : "Not available"}
            </span>
          )}
        </div>
        <div className="flex flex-row items-center gap-4">
        <Button
          size="lg"
          type="submit"
          className="group hover:scale-105 text-2xl font-bold py-8 px-12 rounded-full transition-all duration-200 border-8"
          disabled={!isUsernameAvailable}
        >
          Create your portfolio
        </Button>
        {/* {success && <FormSuccess message={success} />} */}
        {/* {error && <FormError message={error} />} */}
        <span className="font-mono text-xs px-4 opacity-50">
          {isUsernameAvailable && 'Personal link available! You are welcome, I guess.'}
          {error && error}
        </span>
        </div>
      </form>
    </div>
  );
}