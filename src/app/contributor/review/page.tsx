"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Play, ArrowLeft, Info, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const pendingReviews = [
  {
    id: "1",
    english: "How are you today?",
    nepali: "तपाईलाई आज कस्तो छ?",
    hyolmo: "ཁྱེད་རང་ཁམས་བཟང་ངམ།",
    devanagari: "ख्येराङ खाम साङ ? ",
    romanized: "khye-rang khahm sang",
    contributor: "Pema S.",
    region: "Helambu",
    upvotes: 2,
    downvotes: 0,
  },
  {
    id: "2",
    english: "The tea is hot.",
    nepali: "चिया तातो छ।",
    hyolmo: "ཇ་ཚ་པོ་འདུག",
    devanagari: "ज्या सापो दुक",
    romanized: "jya sa-po duk",
    contributor: "Tashi D.",
    region: "Melamchi",
    upvotes: 1,
    downvotes: 1,
  }
];

export default function ReviewQueuePage() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(pendingReviews);

  const handleVote = (id: string, type: 'up' | 'down') => {
    toast({
      title: type === 'up' ? "Approved!" : "Disputed",
      description: type === 'up' ? "Your vote adds consensus to this variant." : "This will be flagged for admin review.",
    });
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/contributor/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Peer Review Queue</h1>
          <p className="text-muted-foreground">Verify translations from other native speakers.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex gap-3 text-orange-800 text-sm">
        <Info className="h-5 w-5 shrink-0" />
        <p><strong>Consensus Rule:</strong> 3 Upvotes with 0 Downvotes pushes a translation to the Learner App instantly. Any downvote triggers a manual Admin Review.</p>
      </div>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <Card className="p-12 text-center space-y-4">
             <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
             <h3 className="text-xl font-bold">Queue Empty!</h3>
             <p className="text-muted-foreground">You've reviewed all pending translations. Great work!</p>
             <Button asChild><Link href="/contributor/dashboard">Return to Dashboard</Link></Button>
          </Card>
        ) : reviews.map((item) => (
          <Card key={item.id} className="overflow-hidden border-2">
            <CardHeader className="bg-secondary/30 pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-white gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.region}
                  </Badge>
                  <CardTitle className="text-xl">{item.english}</CardTitle>
                  <CardDescription className="font-medium text-foreground/70">{item.nepali}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Consensus Status</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-2 w-6 rounded-full ${i <= item.upvotes ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div>
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hyolmo Script</Label>
                    <p className="text-2xl font-bold font-headline mt-1">{item.hyolmo}</p>
                    <p className="text-lg text-muted-foreground mt-1">{item.devanagari}</p>
                  </div>
                   <div>
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Romanization</Label>
                    <p className="text-sm font-medium mt-1">{item.romanized}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-xl border border-dashed border-primary/20">
                  <Button size="lg" className="h-16 w-16 rounded-full shadow-lg">
                    <Play className="h-6 w-6" />
                  </Button>
                  <p className="text-xs font-bold text-primary mt-2">Listen to Pronunciation</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-4 border-t flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-200 gap-2 h-12"
                onClick={() => handleVote(item.id, 'up')}
              >
                <ThumbsUp className="h-4 w-4" />
                Approve (Verify)
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 hover:bg-red-50 hover:text-red-700 hover:border-red-200 gap-2 h-12"
                onClick={() => handleVote(item.id, 'down')}
              >
                <ThumbsDown className="h-4 w-4" />
                Dispute (Flag)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
