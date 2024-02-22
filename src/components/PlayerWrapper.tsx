import { PlayerContextProvider } from '../context/PlayerContext'
import { PlayerProps } from '../types'
import { Player } from './Player'

const PlayerWrapper = (props: PlayerProps) => (
  <PlayerContextProvider
    state={{
      accentColor: props.accentColor,
      currentVolume: 1,
      duration: 0,
      isFullscreen: false,
      style: props.style,
      previousVolume: 1,
      viewportHeight: 0,
      viewportWidth: 0,
    }}
  >
    <Player {...props} />
  </PlayerContextProvider>
)

export { PlayerWrapper as Player }
