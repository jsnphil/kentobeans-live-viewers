import SotnSonglist from './_components/SotnSonglist';

export default async function Page() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SotnSonglist />
    </>
  );
}
