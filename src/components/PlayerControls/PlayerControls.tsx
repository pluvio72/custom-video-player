import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomControls from './BottomControls';

const Wrapper = styled.div<{ info: DOMRect }>`
  height: ${props => props.info.height}px;
  width: ${props => props.info.width}px;
  left: ${props => props.info.left}px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  display: flex;
`;

const Icon = styled.img`
  top: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: relative;
  transform: translateY(-50%);
`;

const TopControls = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

export default function PlayerControls({ videoEl }: Props) {
  const [playing, setPlaying] = useState(!videoEl.paused || false)
  const [currentTime, setCurrentTime] = useState(videoEl.currentTime || 0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(videoEl.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playing])

  const onPlay = () => {
    videoEl.play()
    setPlaying(true)
  }

  const onPause = () => {
    videoEl.pause()
    setPlaying(false)
  }

  const togglePlaying = () => {
    if (playing) {
      onPause()
    } else {
      onPlay() 
    }
  }

  const seek = (value: number) => {
    videoEl.fastSeek(value)
    setCurrentTime(value)
  }

  const changeVolume = (newVolume: number) => {
    videoEl.volume = newVolume;
  }

  return (
    <Wrapper info={videoEl.getBoundingClientRect()}>
      <TopControls onClick={togglePlaying}>
        {playing ?
          <Icon src={'images/pause-icon.png'} onClick={onPause} /> :
          <Icon src={'images/play-icon.png'} onClick={onPlay} /> 
        }
      </TopControls>
      <BottomControls progressBarInfo={{
          progress: currentTime,
          duration: videoEl.duration,
          seekTo: seek
        }}
        changeVolume={changeVolume}
      />
    </Wrapper>
  )
}

interface Props {
  videoEl: HTMLVideoElement
}