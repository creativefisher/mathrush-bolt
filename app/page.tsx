"use client";

import { useState, useEffect, useCallback } from 'react';
import { generateQuestion } from '@/lib/game-utils';
import { Question } from '@/types/game';
import { ScoreDisplay } from '@/components/game/score-display';
import { QuestionDisplay } from '@/components/game/question-display';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountdownSound } from '@/hooks/use-countdown-sound';

const GAME_DURATION = 60;
const CORRECT_POINTS = 10;
const INCORRECT_POINTS = 5;

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [difficulty, setDifficulty] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Use the countdown sound hook
  useCountdownSound(timeLeft, isPlaying);

  const generateNewQuestion = useCallback(() => {
    setCurrentQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setDifficulty(1);
    generateNewQuestion();
  };

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.isEqual;
    if (isCorrect) {
      setScore((prev) => prev + CORRECT_POINTS);
      setDifficulty((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - INCORRECT_POINTS));
    }
    generateNewQuestion();
  };

  const handleRestart = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl relative"
      >
        {isPlaying ? (
          <>
            <ScoreDisplay score={score} timeLeft={timeLeft} />
            <QuestionDisplay
              question={currentQuestion!}
              onAnswer={handleAnswer}
              isActive={isPlaying}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed bottom-8 right-8"
            >
              <Button
                size="lg"
                onClick={handleRestart}
                className={cn(
                  "gap-2 bg-red-500/15 text-red-600 hover:bg-red-500/25",
                  "border-none shadow-lg transition-colors"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold mb-3">Quick Math</h1>
              <p className="text-lg text-muted-foreground">
                Test your arithmetic skills in 60 seconds!
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <Button
                size="lg"
                onClick={startGame}
                className="gap-2 text-lg h-14 px-8"
              >
                <Play className="w-5 h-5" />
                Start Game
              </Button>
              {score > 0 && (
                <div className="mt-6 text-2xl">
                  Final Score: <span className="font-bold">{score}</span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}