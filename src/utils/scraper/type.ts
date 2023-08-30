export interface musicData {
  music_name: string;
  level: number;
  difficulty: string;
  clear_type?: string;
  rank: string;
  score?: string;
  play_type: mode;
}

export type mode = "SP" | "DP";
