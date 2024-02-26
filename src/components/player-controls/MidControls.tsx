import styled from 'styled-components'
import { PlayerProps } from '../../types'

import { PlayIcon, PauseIcon } from '../icons'

export default function MidControls({ playing, midControls, togglePlayState }: Props) {
  if (midControls) {
    return midControls(playing, togglePlayState)
  }

  return (
    <Wrapper onClick={() => togglePlayState()}>
      {playing ? <PauseIcon onClick={togglePlayState} /> : <PlayIcon onClick={togglePlayState} />}
    </Wrapper>
  )
}

interface Props {
  playing: boolean
  midControls: PlayerProps['midControls']
  togglePlayState: () => void
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
