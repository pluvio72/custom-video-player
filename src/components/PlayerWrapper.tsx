import { PlayerContextProvider } from "../context/PlayerContext";
import { PlayerProps } from "../types";
import { Player } from "./Player";

const PlayerWrapper = (props: PlayerProps) => (
  <PlayerContextProvider
    state={{
      accentColor: props.accentColor,
      duration: 0,
      style: props.style,
      viewportHeight: 0,
      viewportWidth: 0,
    }}
  >
    <Player {...props} />
  </PlayerContextProvider>
);

export { PlayerWrapper as Player };
