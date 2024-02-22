export interface ICelebrity {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: IVotes;
}

export interface IVotes {
  positive: number;
  negative: number;
}
