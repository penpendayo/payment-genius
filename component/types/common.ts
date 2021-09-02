export type MoneyType = {
  [price: string]: number;
  "1": number;
  "5": number;
  "10": number;
  "50": number;
  "100": number;
  "500": number;
  "1000": number;
};

export type Animation = [
  { enterDone: string; exit?: string; appearDone?: string },
  { appear: number; enter: number; exit: number } | number
];

export type GameScore = {
  subtotal: number;
  myMoney: MoneyType;
  paidMoney: MoneyType;
};
