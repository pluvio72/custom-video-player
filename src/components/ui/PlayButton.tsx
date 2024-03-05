import { PauseIcon, PlayIcon } from '@components/icons'

export default function PlayButton({ playing, togglePlay }: Props) {
  if (playing) {
    return <PauseIcon onClick={togglePlay} height={24} width={24} />
  } else {
    return <PlayIcon onClick={togglePlay} height={24} width={24} />
  }
}

interface Props {
  playing: boolean
  togglePlay: () => void
}
