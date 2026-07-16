
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import images from "@/app/lib/placeholder-images.json";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Logo isSherpaLearn={true} />
        <nav className="ml-auto hidden lg:flex items-center gap-6">
           <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>Features</Link>
           <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>Testimonials</Link>
           <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>Pricing</Link>
        </nav>
        <div className="ml-auto lg:ml-4 flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
                <Link href="/signup">Get Started</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 p-4">
                  <div className="mb-4">
                    <Logo isSherpaLearn={true} />
                  </div>
                  <nav className="grid gap-2">
                    <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>Features</Link>
                    <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>Testimonials</Link>
                    <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>Pricing</Link>
                  </nav>
                  <div className="flex flex-col gap-2 mt-4">
                     <Button variant="ghost" asChild>
                        <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </header>
      <main className="flex-1">
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image 
          src={images.heroBackground.src}
          alt={images.heroBackground.alt}
          fill
          quality={80}
          className="object-cover"
          data-ai-hint={images.heroBackground.hint}
          priority
        />
        <div className="relative z-20 h-full flex items-center container mx-auto px-4">
          <div className="max-w-2xl text-left text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white font-headline">
              Learn Hyolmo <br/> <span className="text-primary">Language</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Discover the beautiful language of the Himalayan people. Start your journey with interactive lessons, engaging stories, and authentic pronunciation guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
               <Button asChild size="lg" variant="secondary">
                <Link href="#">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
         
        <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
              <div className="grid gap-2 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-lg font-bold">Interactive Lessons</h3>
                <p className="text-sm text-muted-foreground">Structured curriculum designed by experts to take you from beginner to conversational fluency.</p>
              </div>
              <div className="grid gap-2 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-lg font-bold">AI Pronunciation Coach</h3>
                <p className="text-sm text-muted-foreground">Perfect your accent with instant, precise feedback on your spoken Sherpa.</p>
              </div>
              <div className="grid gap-2 text-center">
                <Users className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-lg font-bold">Cultural Immersion</h3>
                <p className="text-sm text-muted-foreground">Learn about the rich traditions and history of the Sherpa people as you learn their language.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
             <div className="text-center space-y-4 mb-12">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Learners Say</h2>
                 <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
                     Hear from students who have started their journey with Hyolmo Lopke.
                 </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Image src={images.testimonials[0].src} data-ai-hint={images.testimonials[0].hint} width={56} height={56} alt="Alex M." className="rounded-full" />
                        <div>
                            <CardTitle>Alex M.</CardTitle>
                            <CardDescription>Trekking Guide</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">"The pronunciation feedback is a game-changer. I feel so much more confident speaking with locals on my treks in the Everest region. It's the best tool I've found for learning Sherpa."</p>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Image src={images.testimonials[1].src} data-ai-hint={images.testimonials[1].hint} width={56} height={56} alt="Jessica R." className="rounded-full" />
                        <div>
                            <CardTitle>Jessica R.</CardTitle>
                            <CardDescription>Linguistics Student</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">"As someone who studies languages, I'm incredibly impressed with the quality of the content. The lessons are well-structured and the cultural notes provide essential context."</p>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Image src={images.testimonials[2].src} data-ai-hint={images.testimonials[2].hint} width={56} height={56} alt="David Chen" className="rounded-full" />
                        <div>
                            <CardTitle>David Chen</CardTitle>
                            <CardDescription>Documentary Filmmaker</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">"Hyolmo Lopke was indispensable for my project in Nepal. I was able to connect with the Sherpa community on a much deeper level thanks to what I learned here."</p>
                    </CardContent>
                 </Card>
            </div>
          </div>
        </section>

      </main>
      <footer className="border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                <Logo isSherpaLearn={true}/>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">&copy; 2024 Hyolmo Lopke. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
                <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
                    Terms
                </Link>
                <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
                    Privacy
                </Link>
                 <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
                    Contact
                </Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
