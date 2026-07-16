import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const lessons = [
  { id: "1", title: "Lesson 1: Basic Greetings", description: "Learn to say hello, goodbye, and thank you.", status: "In Progress", isLocked: false, xp: 50 },
  { id: "2", title: "Lesson 2: Introducing Yourself", description: "Master the phrases for sharing your name and origin.", status: "Not Started", isLocked: false, xp: 75 },
  { id: "3", title: "Lesson 3: Family and Friends", description: "Talk about your family members and friends.", status: "Not Started", isLocked: false, xp: 100 },
  { id: "4", title: "Lesson 4: Numbers and Counting", description: "Learn numbers from 1 to 100.", status: "Not Started", isLocked: false, xp: 100 },
  { id: "5", title: "Lesson 5: At the Market", description: "Practice vocabulary for food and shopping.", status: "Not Started", isLocked: false, xp: 120 },
  { id: "6", title: "Lesson 6: Himalayan Adventures", description: "Discuss trekking and nature with essential phrases.", status: "Not Started", isLocked: false, xp: 150 },
];

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Learning Path</h1>
            <p className="text-muted-foreground">Complete lessons to unlock new ones and earn experience points.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className={`flex flex-col transition-all hover:shadow-md ${lesson.isLocked ? 'bg-muted/50' : 'bg-card'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  {lesson.status === 'In Progress' && <Badge variant="default">In Progress</Badge>}
              </div>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm text-muted-foreground font-semibold">
                + {lesson.xp} XP
              </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled={lesson.isLocked} asChild>
                    <Link href={!lesson.isLocked ? `/dashboard/lessons/${lesson.id}` : '#'}>
                        {lesson.isLocked ? <Lock className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                        {lesson.isLocked ? 'Locked' : (lesson.status === "In Progress" ? "Continue Lesson" : "Start Lesson")}
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
