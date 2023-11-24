import { type } from 'os';

export type SotnWinner = {
  readonly youtubeId: string;
  readonly requester: string;
  readonly streamDate: string;
  readonly artist: string;
  readonly featuredArtist?: string;
  readonly year: string;
  readonly sotsWinner: boolean;
  readonly title: string;
  readonly season?: number;
};

export type SotnStats = {
  user: string;
  wins: number;
  streak: number;
  streamGap: WinGap;
  daysGap: WinGap;
  lastWinDate: string;
  lastStreamWinNumber: number;
};

export type WinGap = {
  longest: number;
  shortest: number;
  current: number;
};

export type SongRequest = {
  song: Song;
  songPlays: SongPlay[];
};

export type Song = {
  youtubeId: string;
  title: string;
  length?: number;
};

export type SongPlay = {
  date: string;
  username: string;
  sotnContender?: boolean;
  sotnWinner?: boolean;
  sotsWinner?: boolean;
};
