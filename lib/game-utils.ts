import { Question } from '@/types/game';
import { operations } from './operations';
import { getRandomNumber, ensureOneDoubleDigit, findFactors, isValidNumber } from './number-utils';

function calculateResult(a: number, b: number, operation: string): number {
  const op = operations.find(o => o.symbol === operation);
  if (!op) throw new Error(`Invalid operation: ${operation}`);
  return op.operation(a, b);
}

export function generateQuestion(difficulty: number): Question {
  const maxNumber = Math.min(10 + Math.floor(difficulty / 2), 99);
  
  // Select different operations for each side
  const leftOpIndex = Math.floor(Math.random() * operations.length);
  let rightOpIndex;
  do {
    rightOpIndex = Math.floor(Math.random() * operations.length);
  } while (rightOpIndex === leftOpIndex);
  
  const leftOp = operations[leftOpIndex];
  const rightOp = operations[rightOpIndex];
  const shouldBeEqual = Math.random() < 0.5;
  
  // Generate left side
  let [a, b] = leftOp.generateNumbers(maxNumber);
  [a, b] = ensureOneDoubleDigit([a, b]);
  const leftResult = calculateResult(a, b, leftOp.symbol);
  
  if (!isValidNumber(leftResult)) {
    return generateQuestion(difficulty);
  }
  
  // Generate right side
  let c, d;
  if (shouldBeEqual) {
    if (rightOp.symbol === '/') {
      // For division, find a number that divides evenly into leftResult
      const factors = findFactors(leftResult);
      if (factors.length < 2) return generateQuestion(difficulty);
      d = factors[getRandomNumber(0, factors.length - 1)];
      c = leftResult * d;
    } else if (rightOp.symbol === '-') {
      c = leftResult + getRandomNumber(1, Math.min(99 - leftResult, 20));
      d = c - leftResult;
    } else if (rightOp.symbol === '+') {
      d = getRandomNumber(1, leftResult - 1);
      c = leftResult - d;
    } else { // multiplication
      const factors = findFactors(leftResult);
      if (factors.length < 2) return generateQuestion(difficulty);
      c = factors[getRandomNumber(0, factors.length - 1)];
      d = leftResult / c;
    }
  } else {
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
      [c, d] = rightOp.generateNumbers(maxNumber);
      const rightResult = calculateResult(c, d, rightOp.symbol);
      
      if (isValidNumber(rightResult) && rightResult !== leftResult) {
        break;
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        return generateQuestion(difficulty);
      }
    } while (true);
  }
  
  [c, d] = ensureOneDoubleDigit([c, d]);
  
  // Final validation to ensure both sides calculate to integers
  const finalLeftResult = calculateResult(a, b, leftOp.symbol);
  const finalRightResult = calculateResult(c, d, rightOp.symbol);
  
  if (!Number.isInteger(finalLeftResult) || !Number.isInteger(finalRightResult) ||
      finalLeftResult < 1 || finalRightResult < 1 ||
      finalLeftResult > 99 || finalRightResult > 99) {
    return generateQuestion(difficulty);
  }

  return {
    leftSide: { a, b, operation: leftOp.symbol },
    rightSide: { c, d, operation: rightOp.symbol },
    isEqual: shouldBeEqual,
  };
}