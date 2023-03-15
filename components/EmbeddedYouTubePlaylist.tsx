export interface YtPlaylistProps {
  readonly playlistName: string;
  readonly playlistId: string;
}

export default function EmbeddedYouTubePlaylist(props: YtPlaylistProps) {
  return (
    <>
      <iframe
        width='400'
        height='200'
        src={`https://www.youtube.com/embed/videoseries?list=${props.playlistId}`}
        title={props.playlistName}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </>
  );
}
