export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ensureOneDoubleDigit(nums: number[]): number[] {
  const result = [...nums];
  if (!result.some(n => n >= 10 && n <= 99)) {
    const indexToReplace = Math.floor(Math.random() * result.length);
    result[indexToReplace] = getRandomNumber(10, 99);
  }
  return result.map(n => Math.min(99, Math.max(1, Math.floor(n))));
}

export function findFactors(n: number): number[] {
  if (!Number.isInteger(n)) return [];
  
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      if (i >= 1 && i <= 99) factors.push(i);
      const pair = n / i;
      if (Number.isInteger(pair) && pair >= 1 && pair <= 99 && i !== pair) {
        factors.push(pair);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

export function isValidNumber(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 99;
}