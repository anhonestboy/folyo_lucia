import { phudu } from "@/lib/phudu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

interface FormWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  social?: boolean;
  linkLabel?: string;
  linkHref?: string;
}

const FormWrapper = ({
  children,
  title,
  description,
  social,
  linkLabel,
  linkHref,
}: FormWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-background text-foreground">
      <div className="max-w-md w-full space-y-6 p-6 rounded-lg shadow-lg bg-card text-card-foreground">
        <div
          className={cn(
            "text-5xl font-bold flex items-center justify-center gap-2 tracking-widest py-4",
            phudu.className
          )}
        >
          Folyo
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
        {social && (
          <>
            <p className="text-center text-muted-foreground">-- OR --</p>
            <Button variant={"secondary"} className="w-full">
              <Github size={18} className="me-2" />
              Continue with Github
            </Button>
          </>
        )}
        {linkLabel && linkHref && (
          <Link href={linkHref} className="flex items-center justify-center">
            <Button variant={"link"}>{linkLabel}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FormWrapper;
