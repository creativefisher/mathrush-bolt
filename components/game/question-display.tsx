"use client";

import { Question } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  isActive: boolean;
}

export function QuestionDisplay({ question, onAnswer, isActive }: QuestionDisplayProps) {
  const { leftSide, rightSide } = question;
  
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={`${leftSide.a}${leftSide.b}${rightSide.c}${rightSide.d}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center mt-20"
        >
          <div className="text-6xl font-bold mb-12">
            <span>{leftSide.a}</span>
            <span className="mx-4">{leftSide.operation}</span>
            <span>{leftSide.b}</span>
            <span className="mx-6">=</span>
            <span>{rightSide.c}</span>
            <span className="mx-4">{rightSide.operation}</span>
            <span>{rightSide.d}</span>
          </div>
          
          <div className="flex justify-center gap-6">
            <Button
              size="lg"
              onClick={() => onAnswer(true)}
              className={cn(
                "min-w-[140px] text-lg h-14",
                "bg-emerald-500 hover:bg-emerald-600",
                "text-white border-none shadow-lg"
              )}
            >
              Yes
            </Button>
            <Button
              size="lg"
              onClick={() => onAnswer(false)}
              className={cn(
                "min-w-[140px] text-lg h-14",
                "bg-red-500 hover:bg-red-600",
                "text-white border-none shadow-lg"
              )}
            >
              No
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}