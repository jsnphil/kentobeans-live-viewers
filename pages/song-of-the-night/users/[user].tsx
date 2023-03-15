import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SotnUserStats: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;
  return (
    <>
      Stats for {user}
      <Link href={`/song-of-the-night/users`}>Back to users</Link>
    </>
  );
};

export default SotnUserStats;
