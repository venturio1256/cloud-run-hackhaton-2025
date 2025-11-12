
export interface Team {
  name: string;
  logoUrl: string;
}

export interface SportEvent {
  id: number;
  sport: string;
  teams: [Team, Team];
  time: string;
  status: 'LIVE' | 'UPCOMING' | 'FINAL';
  channel: string;
}

export interface ChatMessage {
    id: number;
    content: string; // This will be raw HTML from the server
}
