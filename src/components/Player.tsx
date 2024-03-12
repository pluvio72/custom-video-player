import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import PlayerControls from './player-controls/PlayerControls'
import styled from 'styled-components'
import { PlayerProps } from '../types'
import { PContext } from '../context/PlayerContext'
import MidControls from './player-controls/MidControls'
import BottomControls from './player-controls/BottomControls'
import screenfull from 'screenfull'
import { usePlayerContext } from '../hooks/usePlayerContext'
import TopControls from './player-controls/TopControls'

export function Player({
  autoplay,
  height,
  src,
  videoType = 'mp4',
  width,
  bottomControls,
  midControls,
  topControls,
}: PlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const playerWrapperRef = useRef<HTMLDivElement>(null)

  const [currentTime, setCurrentTime] = useState(playerRef.current?.currentTime || 0)

  const { state, setState } = usePlayerContext(PContext)

  // Update when new src
  useEffect(() => {
    setCurrentTime(0)
  }, [src])

  // Setting state in here as pressing `esc` needs to trigger state updates too
  useEffect(() => {
    screenfull.onchange(() => {
      setState((prev) => ({
        ...prev,
        isFullscreen: !prev.isFullscreen,
      }))
    })
  }, [screenfull])

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.playing) {
        setCurrentTime(Math.floor(playerRef.current?.currentTime || 0))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [state.playing])

  useLayoutEffect(() => {
    if (playerRef.current) {
      const current = playerRef.current
      setState((prev) => ({
        ...prev,
        duration: current.duration,
      }))
    }
  }, [])

  const togglePlaying = () => {
    if (state.playing) {
      playerRef.current?.pause()
      setState((prev) => ({
        ...prev,
        playing: false,
      }))
    } else {
      playerRef.current?.play()
      setState((prev) => ({
        ...prev,
        playing: true,
      }))
    }
  }

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const value = Number(e.currentTarget.value)

      playerRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const changeVolume = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.volume = newVolume
      setState((prev) => ({
        ...prev,
        currentVolume: newVolume,
      }))

      if (newVolume > 0) {
        setState((prev) => ({
          ...prev,
          previousVolume: newVolume,
        }))
      }
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      let newVolume: number
      if (state.currentVolume > 0) {
        newVolume = 0
      } else {
        newVolume = state.previousVolume
      }
      setState((prev) => ({
        ...prev,
        currentVolume: newVolume,
      }))
    }
  }

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
      }
    }
  }

  const onLoad = () => {
    if (playerRef.current) {
      const boundingRect = playerRef.current.getBoundingClientRect()
      const duration = playerRef.current.duration

      setState((prev) => ({
        ...prev,
        viewportHeight: boundingRect.height,
        viewportWidth: boundingRect.width,
        duration,
      }))
    }
  }

  return (
    <Wrapper
      ref={playerWrapperRef}
      id='player'
      $isFullscreen={state.isFullscreen}
      $width={width}
      $height={height}
    >
      <PlayerControls playerRef={playerRef} wrapperRef={playerWrapperRef}>
        <TopControls topControls={topControls} />
        <MidControls
          midControls={midControls}
          playing={state.playing}
          togglePlayState={togglePlaying}
        />
        <BottomControls
          bottomControls={bottomControls}
          progress={currentTime}
          seekTo={seek}
          changeVolume={changeVolume}
          toggleFullscreen={toggleFullscreen}
          toggleMute={toggleMute}
          togglePlay={togglePlaying}
        />
      </PlayerControls>
      <Video ref={playerRef} onLoadedMetadata={onLoad} autoPlay={autoplay}>
        <source src={src} type={`video/${videoType}`} />
      </Video>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $isFullscreen: boolean; $width?: number; $height?: number }>`
  width: ${(props) => (props.$isFullscreen ? '100%' : props.$width ? `${props.$width}px` : '100%')};
  height: ${(props) => (props.$isFullscreen ? '100vh' : props.$height ? `${props.$height}px` : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  background-color: ${(props) => (props.$isFullscreen ? 'black' : '')};
`

const Video = styled.video`
  max-height: 100vh;
  width: 100%;
`
