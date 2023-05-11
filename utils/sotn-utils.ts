export const generateUserStats = () => {
  return {};
};

export const getDateDiff = (date1: Date, date2: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export function getDate(playDate: string) {
  const date = new Date(playDate);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

export const getArtistValue = (artist: string, featArtist?: string): string => {
  if (featArtist) {
    return `${artist.replaceAll('|', ' & ')} feat. ${featArtist.replaceAll(
      '|',
      ' & '
    )}`;
  } else {
    return artist.replaceAll('|', ' & ');
  }
};
