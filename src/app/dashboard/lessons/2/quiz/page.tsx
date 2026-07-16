"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

const questions = [
  {
    question: "How do you ask 'What is your name?' in Sherpa?",
    options: ["Kham-sang?", "Ngi ming-la ... yin", "Khyeki ming-la kar-re?", "Thuk-je-che"],
    answer: "Khyeki ming-la kar-re?"
  },
  {
    question: "'Ngi ming-la Tenzing yin' means...",
    options: ["My name is Tenzing", "What is your name?", "Where are you from?", "I am Tenzing"],
    answer: "My name is Tenzing"
  },
  {
    question: "Which phrase means 'Nice to meet you'?",
    options: ["Khyerang-la khang-ne yin?", "Tashi delek", "Khyerang-la nyerpa-la ga-po jung", "La-so"],
    answer: "Khyerang-la nyerpa-la ga-po jung"
  },
  {
    question: "How would you ask 'Where are you from?'",
    options: ["Nga ... ne yin", "Khyerang-la khang-ne yin?", "Kham-sang?", "Me-le"],
    answer: "Khyerang-la khang-ne yin?"
  },
  {
    question: "You want to say 'I am from Nepal'. How would you say that?",
    options: ["Nga Nepal ne yin", "Khyeki ming-la Nepal?", "Nepal la-so", "Tashi delek Nepal"],
    answer: "Nga Nepal ne yin"
  },
];

export default function LessonTwoQuiz() {
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
                    <CardDescription>You did a great job finishing the quiz for Lesson 2.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">Your Score: {Math.round((score/questions.length) * 100)}%</p>
                    <p className="text-muted-foreground mt-2">You answered {score} out of {questions.length} questions correctly.</p>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-2">
                    <Button className="w-full" onClick={() => router.push('/dashboard/lessons')}>
                        Back to Lessons
                    </Button>
                    <Button className="w-full" variant="outline" onClick={() => router.push('/dashboard/lessons/3')}>
                        Next Lesson (Coming Soon)
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
                <p className="text-sm text-muted-foreground mb-2">Lesson 2 Quiz</p>
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
