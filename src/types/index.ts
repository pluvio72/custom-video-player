import React, { ChangeEvent, ReactNode } from 'react'

export type VideoDimensionInfo = {
  width: number
  height: number
}

export type VideoTypes = 'mp4' | 'ogg' | 'webm'

export type PlayerProps = {
  accentColor?: string
  height?: number
  src: string | undefined
  videoType?: VideoTypes
  volumeIcon?: ReactNode
  width?: number
  bottomControls?: (
    progress: number,
    duration: number,
    seekTo: (e: ChangeEvent<HTMLInputElement>) => void,
    changeVolume: (newVolume: number) => void,
    toggleFullscreen: () => void,
    toggleMute: () => void,
    togglePlay: () => void,
  ) => JSX.Element
  midControls?: (playing: boolean, togglePlayState: () => void) => JSX.Element
  topControls?: () => JSX.Element
}

export type PlayerContext = {
  state: {
    accentColor?: PlayerProps['accentColor']
    currentVolume: number
    duration: number
    isFullscreen: boolean
    playing: boolean
    previousVolume: number
    viewportWidth: number
    viewportHeight: number
    volumeSliderOpen: boolean
  }
  setState: React.Dispatch<React.SetStateAction<PlayerContext['state']>>
}

export interface IconProps {
  height?: number
  width?: number
  viewbox?: string
  onClick?: () => void
}
