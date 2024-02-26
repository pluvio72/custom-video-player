import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import PlayerControls from './player-controls/PlayerControls'
import styled from 'styled-components'
import { PlayerProps, VideoTypes } from '../types'
import { PContext } from '../context/PlayerContext'
import MidControls from './player-controls/MidControls'
import BottomControls from './player-controls/BottomControls'
import screenfull from 'screenfull'
import { usePlayerContext } from '../hooks/usePlayerContext'
import TopControls from './player-controls/TopControls'

export function Player({
  height,
  src,
  videoType = VideoTypes.mp4,
  width,
  bottomControls,
  midControls,
  topControls,
}: PlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const playerWrapperRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(playerRef.current?.currentTime || 0)

  const { state, setState } = usePlayerContext(PContext)

  useEffect(() => {
    screenfull.onchange((e) => {
      console.log(e)
    })
  }, [screenfull])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(Math.floor(playerRef.current?.currentTime || 0))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playing])

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
    if (playing) {
      playerRef.current?.pause()
      setPlaying(false)
    } else {
      playerRef.current?.play()
      setPlaying(true)
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
      let isFullscreen = false

      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
        isFullscreen = true
      }

      setState((prev) => ({
        ...prev,
        isFullscreen,
      }))
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
        <MidControls midControls={midControls} playing={playing} togglePlayState={togglePlaying} />
        <BottomControls
          bottomControls={bottomControls}
          progress={currentTime}
          seekTo={seek}
          changeVolume={changeVolume}
          toggleFullscreen={toggleFullscreen}
          toggleMute={toggleMute}
        />
      </PlayerControls>
      <Video ref={playerRef} onLoadedMetadata={onLoad}>
        <source src={src} type={videoType} />
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
`

const Video = styled.video`
  max-height: 100vh;
  width: 100%;
`
