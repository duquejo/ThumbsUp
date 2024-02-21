export interface ICelebrity {
  name:        string;
  description: string;
  category:    string;
  picture:     string;
  lastUpdated: string;
  votes:       IVotes;
}

export interface IVotes {
  positive: number;
  negative: number;
}
