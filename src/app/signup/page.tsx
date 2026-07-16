import { SignUpForm } from "@/components/auth/SignUpForm";
import { Logo } from "@/components/Logo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
            <Logo />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
