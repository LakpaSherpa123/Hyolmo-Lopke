"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

const questions = [
  {
    question: "What is the Sherpa greeting for 'Hello'?",
    options: ["Thuk-je-che", "Tashi delek", "Kham-sang?", "De-lek"],
    answer: "Tashi delek"
  },
  {
    question: "How do you say 'Thank you' in Sherpa?",
    options: ["La-so", "Me-le", "Thuk-je-che", "Tashi delek"],
    answer: "Thuk-je-che"
  },
  {
    question: "Which phrase means 'How are you?'",
    options: ["Kham-sang?", "De-lek", "La-so", "Thuk-je-che"],
    answer: "Kham-sang?"
  },
  {
    question: "What does 'La-so' mean?",
    options: ["No", "Maybe", "Yes", "Goodbye"],
    answer: "Yes"
  },
    {
    question: "You want to say 'No'. Which word do you use?",
    options: ["Me-le", "La-so", "De-lek", "Kham-sang?"],
    answer: "Me-le"
  },
];

export default function LessonOneQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    if(correct) setScore(score + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-6 space-y-6">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                    <CardDescription>You did a great job finishing the quiz for Lesson 1.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">Your Score: {Math.round((score/questions.length) * 100)}%</p>
                    <p className="text-muted-foreground mt-2">You answered {score} out of {questions.length} questions correctly.</p>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-2">
                    <Button className="w-full" onClick={() => router.push('/dashboard/lessons')}>
                        Back to Lessons
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => router.push('/dashboard/lessons/2')}>
                        Next Lesson
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">Lesson 1 Quiz</p>
                <Progress value={progress} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                    <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {currentQuestion.options.map((option) => (
                    <Button
                    key={option}
                    variant="outline"
                    size="lg"
                    className={`w-full justify-start h-auto py-3 text-left
                        ${showFeedback && option === selectedOption ? (isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}
                        ${showFeedback && option === currentQuestion.answer ? 'border-green-500' : ''}
                    `}
                    onClick={() => handleOptionSelect(option)}
                    disabled={showFeedback}
                    >
                        <div className="flex items-center w-full">
                            <span className="flex-1">{option}</span>
                            {showFeedback && option === selectedOption && (isCorrect ? <CheckCircle className="text-green-500"/> : <XCircle className="text-red-500"/>)}
                        </div>
                    </Button>
                ))}
                </CardContent>
                {showFeedback && (
                    <CardFooter className="flex-col items-stretch">
                         <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                            <h4 className="font-bold">{isCorrect ? "Correct!" : "Incorrect"}</h4>
                            {!isCorrect && <p>The correct answer is: {currentQuestion.answer}</p>}
                        </div>
                        <Button onClick={handleNext} className="mt-4 w-full">
                            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    </div>
  );
}
