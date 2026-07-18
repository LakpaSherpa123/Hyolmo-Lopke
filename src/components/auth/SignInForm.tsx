"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Please enter your email or username.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Hardcoded bypass for the requested test account
    if (values.email.toLowerCase() === "test" && values.password === "test") {
      toast({
        title: "Demo Mode Active",
        description: "Logged in with test credentials.",
      });
      router.push("/dashboard");
      return;
    }

    try {
      // Ensure it's an email format for Firebase
      const email = values.email.includes("@") ? values.email : `${values.email}@example.com`;
      await signInWithEmailAndPassword(auth, email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            errorMessage = "Invalid email or password. Please try again.";
            break;
        case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
        default:
            console.error("Firebase sign-in error:", error);
      }
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDemoLogin = () => {
    form.setValue("email", "test");
    form.setValue("password", "test");
    form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>Sign in to continue your journey with Hyolmo Lopke.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="test or name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
                </Button>
                
                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 border-dashed" 
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Quick Demo Login (test/test)
                </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline font-bold text-primary hover:text-primary/80">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
