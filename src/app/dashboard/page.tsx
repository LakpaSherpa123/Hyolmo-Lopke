import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-secondary/50">
       <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Tenzing!</h1>
            <p className="text-muted-foreground">Let's continue your Sherpa learning journey.</p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 flex flex-col">
           <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>You're on a roll. Pick up where you left off.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="flex items-center p-6 bg-secondary rounded-lg">
                <div className="mr-4 bg-primary/10 text-primary p-3 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Next up</p>
                    <h3 className="text-lg font-semibold">Lesson 2: Introducing Yourself</h3>
                </div>
                 <Button asChild>
                  <Link href="/dashboard/lessons/2">
                    Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        <ProgressTracker />
      </div>
    </div>
  );
}
