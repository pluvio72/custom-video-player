import { PropsWithChildren, createContext, useState } from "react";
import type { PlayerContext } from "../types";

export const DefaultPlayerState = {
  state: {
    accentColor: "orange",
  },
  setState: () => {},
};

export const PContext = createContext<PlayerContext>(DefaultPlayerState);

export function PlayerContextProvider({
  state,
  children,
}: PropsWithChildren<Omit<PlayerContext, "setState">>) {
  const [playerState, setPlayerState] = useState<PlayerContext["state"]>(state);

  return (
    <PContext.Provider
      value={{
        state: playerState,
        setState: setPlayerState,
      }}
    >
      {children}
    </PContext.Provider>
  );
}
