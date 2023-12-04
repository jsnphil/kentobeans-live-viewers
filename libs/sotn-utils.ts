import { SotnWinner, SotnWinnerData } from '../@types';

export const processSotnData = (winnerData: SotnWinner[]) => {
  let winnersMap = new Map<string, any[]>();

  winnerData.forEach((winner: SotnWinner, index: number) => {
    const requester = winner.requester.toLowerCase();

    if (winnersMap.has(requester)) {
      winnersMap.get(requester)?.push(winner);
    } else {
      winnersMap.set(requester, [winner]);
    }
  });

  let sotnWinners: SotnWinnerData[] = [];

  winnersMap.forEach((songs, key) => {
    songs.sort(
      (song1: SotnWinner, song2: SotnWinner) =>
        new Date(song2.streamDate).getTime() -
        new Date(song1.streamDate).getTime()
    );

    sotnWinners.push({
      username: key,
      songs: songs
    });
  });

  sotnWinners.sort(
    (winner1, winner2) => winner2.songs.length - winner1.songs.length
  );

  return sotnWinners;
};
