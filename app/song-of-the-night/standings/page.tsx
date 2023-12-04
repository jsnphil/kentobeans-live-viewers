import Standings, { SotnStandingsData } from './_components/Standings';

async function getLatestSeasonStandings() {
  // TODO Update with prod and staging domains
  // TODO Update the endpoint with a 'latest' query param
  const res = await fetch(
    `https://6dpo5kprt9.execute-api.us-east-1.amazonaws.com/prod/song-of-the-night/winning-requests?season=12`
  );

  const standingsData = await res.json();
  return standingsData;
}

export default async function Page() {
  const standingsData = await getLatestSeasonStandings();
  return (
    <>
      <Standings
        count={standingsData.count}
        winners={standingsData.winners}
        latestSeason='12'
      />
    </>
  );
}
