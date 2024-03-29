import { PropsWithChildren, createContext, useState } from 'react'
import { type PlayerContext } from '../types'

export const DefaultPlayerState: PlayerContext = {
  state: {
    accentColor: 'orange',
    currentVolume: 1,
    duration: 0,
    isFullscreen: false,
    playing: false,
    previousVolume: 0,
    volumeSliderOpen: false,
    viewportWidth: 0,
    viewportHeight: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: () => {},
}

export const PContext = createContext<PlayerContext>(DefaultPlayerState)

export function PlayerContextProvider({
  state,
  children,
}: PropsWithChildren<Omit<PlayerContext, 'setState'>>) {
  const [playerState, setPlayerState] = useState<PlayerContext['state']>(state)

  return (
    <PContext.Provider
      value={{
        state: playerState,
        setState: setPlayerState,
      }}
    >
      {children}
    </PContext.Provider>
  )
}
