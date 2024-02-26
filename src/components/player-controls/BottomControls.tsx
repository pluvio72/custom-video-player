import styled from 'styled-components'
import ProgressBar from '../ui/scrubber/Scrubber'
import VolumeSlider from '../ui/VolumeSlider'
import FullscreenIcon from '../ui/FullScreenIcon'
import { PlayerProps } from '../../types'
import { usePlayerContext } from '../../hooks/usePlayerContext'
import { PContext } from '../../context/PlayerContext'
import { ChangeEvent } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export default function BottomControls({
  progress,
  bottomControls,
  seekTo,
  changeVolume,
  toggleFullscreen,
  toggleMute,
}: Props) {
  const { state } = usePlayerContext(PContext)

  if (bottomControls) {
    return bottomControls(
      progress,
      state.duration,
      seekTo,
      changeVolume,
      toggleFullscreen,
      toggleMute,
    )
  }

  return (
    <Wrapper>
      <ProgressBar duration={state.duration} progress={progress} seekTo={seekTo} />
      <VolumeSlider changeVolume={changeVolume} toggleMute={toggleMute} />
      <FullscreenIcon toggleFullscreen={toggleFullscreen} isFullscreen={state.isFullscreen} />
    </Wrapper>
  )
}

interface Props {
  progress: number
  bottomControls: PlayerProps['bottomControls']
  changeVolume: (newVol: number) => void
  seekTo: (e: ChangeEvent<HTMLInputElement>) => void
  toggleFullscreen: () => void
  toggleMute: () => void
}
