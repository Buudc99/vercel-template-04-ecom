export interface ReactionsResponse {
  status: string;
  code: number;
  data: Reaction[];
  message: string;
}

export interface Reaction {
  id: number;
  type: string;
  emoji: string;
}
