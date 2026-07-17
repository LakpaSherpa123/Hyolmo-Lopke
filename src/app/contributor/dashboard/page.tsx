"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Award, CheckCircle2, Clock, ThumbsUp, Users } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function ContributorDashboardPage() {
  const stats = [
    { label: "Submitted", value: "24", icon: PlusCircle, color: "text-blue-500" },
    { label: "Verified", value: "18", icon: CheckCircle2, color: "text-green-500" },
    { label: "Pending", value: "6", icon: Clock, color: "text-orange-500" },
    { label: "Upvotes", value: "142", icon: ThumbsUp, color: "text-primary" },
  ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contributor Portal</h1>
          <p className="text-muted-foreground">Help preserve the Hyolmo language for future generations.</p>
        </div>
        <Button asChild>
          <Link href="/contributor/translate">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Translation
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Contributor Status
            </CardTitle>
            <CardDescription>Your ranking among native speakers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold text-primary">Silver Guardian</p>
              </div>
              <p className="text-sm font-medium">850 / 1000 Points</p>
            </div>
            <Progress value={85} />
            <p className="text-xs text-muted-foreground">Submit 15 more verified translations to reach Gold Level.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Translation Verified", item: "How is your mother?", time: "2 hours ago" },
                { action: "New Submission", item: "The mountains are beautiful.", time: "Yesterday" },
                { action: "Upvote Received", item: "Tashi Delek greeting", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground italic">{activity.item}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
