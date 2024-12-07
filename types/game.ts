export interface Operation {
  symbol: string;
  operation: (a: number, b: number) => number;
  generateNumbers: (maxNumber: number) => [number, number];
}

export interface Question {
  leftSide: {
    a: number;
    b: number;
    operation: string;
  };
  rightSide: {
    c: number;
    d: number;
    operation: string;
  };
  isEqual: boolean;
}