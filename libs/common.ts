export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const splitDate = dateString.split(' ');
  const datestamp = new Date(splitDate[0]);
  const timestamp = splitDate[1];

  return [
    padTo2Digits(datestamp.getMonth() + 1),
    padTo2Digits(datestamp.getDate()),
    datestamp.getFullYear()
  ].join('/');
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const secondsToMinutes = (seconds: number | string) => {
  if (typeof seconds === 'string') {
    seconds = parseInt(seconds);
  }

  return (
    Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)
  );
};
