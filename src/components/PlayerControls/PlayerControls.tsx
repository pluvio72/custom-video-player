import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

const Wrapper = styled.div<{ info: DOMRect }>`
  height: ${props => props.info.height}px;
  width: ${props => props.info.width}px;
  left: ${props => props.info.left}px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
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

  return (
    <Wrapper info={videoEl.getBoundingClientRect()} onClick={togglePlaying}>
      {playing ?
        <Icon src={'images/pause-icon.png'} onClick={onPause} /> :
        <Icon src={'images/play-icon.png'} onClick={onPlay} /> 
      }
      <ProgressBar progress={currentTime} duration={videoEl.duration} seekTo={seek} />
    </Wrapper>
  )
}

interface Props {
  videoEl: HTMLVideoElement
}