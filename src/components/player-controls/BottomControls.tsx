import styled from 'styled-components'
import ProgressBar from '../ui/scrubber/Scrubber'
import VolumeSlider from '../ui/VolumeSlider'
import FullscreenIcon from '../ui/FullScreenIcon'
import { PlayerProps } from '../../types'
import { usePlayerContext } from '../../hooks/usePlayerContext'
import { PContext } from '../../context/PlayerContext'
import { ChangeEvent } from 'react'
import PlayButton from '@components/ui/PlayButton'

export default function BottomControls({
  progress,
  bottomControls,
  seekTo,
  changeVolume,
  toggleFullscreen,
  toggleMute,
  togglePlay,
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
      togglePlay,
    )
  }

  return (
    <Wrapper>
      <ProgressBar duration={state.duration} progress={progress} seekTo={seekTo} />
      <BottomWrapper>
        <PlayButtonWrapper>
          <PlayButton playing={state.playing} togglePlay={togglePlay} />
        </PlayButtonWrapper>
        <VolumeSlider changeVolume={changeVolume} toggleMute={toggleMute} />
        <FullscreenIcon toggleFullscreen={toggleFullscreen} isFullscreen={state.isFullscreen} />
      </BottomWrapper>
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
  togglePlay: () => void
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  margin-top: auto;
  width: 95%;
  margin-right: 10px;
  margin-left: 10px;
`

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  margin-left: auto;
  width: 100%;
`

const PlayButtonWrapper = styled.div`
  margin-right: auto;
  padding-left: 5px;
  display: grid;
  place-items: center;
`
