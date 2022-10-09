// TODO Replace this with a declaration file?

export interface SongRequest {
  _id: number;
  youtubeId: string;
  requester: string;
  songTitle: string;
  season: number;
  playDate: string;
  sotnContender: boolean;
  sotnWinner: boolean;
  sotsWinner: boolean;
  artist: string;
  featuredArtist: string;
  songYear: string;
}

export interface SongRequestDataRow {
  requester: string;
  songTitle: string;
  season: number;
  playDate: string;
  sotnContender: boolean;
  sotnWinner: boolean;
  sotsWinner: boolean;
}
