import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
  timeLeft: number;
}

export function ScoreDisplay({ score, timeLeft }: ScoreDisplayProps) {
  const isTimeRunningOut = timeLeft <= 10;

  return (
    <div className="fixed top-4 left-0 right-0 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="bg-primary/10 rounded-lg p-4 min-w-[150px] text-center"
          initial={{ scale: 0.8, x: -50 }}
          animate={{ scale: 1, x: 0 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Score</div>
          <div className="text-3xl font-bold text-primary">{score}</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Quick Math
        </motion.h1>
        
        <motion.div
          className="bg-primary/10 rounded-lg p-4 min-w-[150px] text-center"
          initial={{ scale: 0.8, x: 50 }}
          animate={{ scale: 1, x: 0 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Time Left</div>
          <div className={`text-3xl font-bold ${isTimeRunningOut ? 'text-orange-500' : 'text-primary'}`}>
            {timeLeft}s
          </div>
        </motion.div>
      </div>
    </div>
  );
}