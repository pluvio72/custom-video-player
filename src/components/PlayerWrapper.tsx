import { FC } from 'react'
import { PlayerContextProvider } from '../context/PlayerContext'
import { PlayerProps } from '../types'
import { Player } from './Player'

const PlayerWrapper: FC<PlayerProps> = (props: PlayerProps) => (
  <PlayerContextProvider
    state={{
      accentColor: props.accentColor,
      currentVolume: 1,
      duration: 0,
      isFullscreen: false,
      previousVolume: 1,
      playing: false,
      volumeSliderOpen: false,
      viewportHeight: 0,
      viewportWidth: 0,
    }}
  >
    <Player {...props} />
  </PlayerContextProvider>
)

export { PlayerWrapper as Player }
