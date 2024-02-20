import { PlayerProps } from "../../types"

export default function TopControls({ topControls }: Props) {
  if (topControls) {
    return topControls()
  }

  else return (
    <div></div>
  )
}

interface Props {
  topControls: PlayerProps['topControls'];
}