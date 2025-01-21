import ReactAudioPlayer from "react-audio-player"; // for playing the sound

export default function MusicPlayer({ songURL }: { songURL: string }) {
  return <ReactAudioPlayer src={songURL} controls />;
}
