import { Operation } from '@/types/game';
import { getRandomNumber, isValidNumber } from './number-utils';

export const operations: Operation[] = [
  { 
    symbol: '+', 
    operation: (a, b) => a + b,
    generateNumbers: (maxNumber: number): [number, number] => {
      const max = Math.min(maxNumber, 99);
      const a = getRandomNumber(1, Math.floor(max / 2));
      const b = getRandomNumber(1, max - a);
      return [a, b];
    }
  },
  { 
    symbol: '-', 
    operation: (a, b) => a - b,
    generateNumbers: (maxNumber: number): [number, number] => {
      const max = Math.min(maxNumber, 99);
      const a = getRandomNumber(2, max);
      const b = getRandomNumber(1, a - 1);
      return [a, b];
    }
  },
  { 
    symbol: 'x', 
    operation: (a, b) => a * b,
    generateNumbers: (maxNumber: number): [number, number] => {
      const max = Math.min(maxNumber, 99);
      // Ensure product is within bounds
      const a = getRandomNumber(1, Math.floor(Math.sqrt(max)));
      const maxB = Math.floor(max / a);
      const b = getRandomNumber(1, maxB);
      return [a, b];
    }
  },
  { 
    symbol: '/', 
    operation: (a, b) => a / b,
    generateNumbers: (maxNumber: number): [number, number] => {
      // Start with a small divisor to ensure manageable numbers
      const b = getRandomNumber(2, 12);
      // Generate a multiple of b that's within our range
      const maxMultiple = Math.floor(Math.min(maxNumber, 99) / b);
      const multiple = getRandomNumber(1, maxMultiple);
      const a = b * multiple;
      
      // Ensure we have valid numbers within our range
      if (!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(a/b)) {
        return [12, 3]; // fallback to a safe division
      }
      
      return [a, b];
    }
  },
];