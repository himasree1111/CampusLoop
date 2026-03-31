export interface UserStats {
  itemsGiven: number;
  itemsReceived: number;
  carbonSaved: number;
}

export interface LeaderboardUser {
  name: string;
  score: number;
  itemsGiven: number;
  carbon: number;
}

export const carbonMap: Record<string, number> = {
  Books: 1.5,
  Electronics: 5,
  Clothing: 2,
  Furniture: 10,
  Other: 1
};

