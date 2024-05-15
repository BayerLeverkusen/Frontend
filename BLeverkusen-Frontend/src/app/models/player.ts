export interface Player {
    id: number;
    name: string;
    lastName: string;
    nationality: string;
    positions: Set<string>;
    injured: boolean;
  }
  