import { useRef } from "react";
import PlayerControls from "./PlayerControls/PlayerControls";
import styled from "styled-components";
import { PlayerProps } from "../types";
import { PlayerContextProvider } from "../context/PlayerContext";

export function Player({
  accentColor,
  height,
  src,
  videoType,
  width,
}: PlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <PlayerContextProvider state={{ accentColor }}>
      <Wrapper ref={playerWrapperRef}>
        <PlayerControls
          playerRef={playerRef}
          wrapperRef={playerWrapperRef}
        />
        <Video ref={playerRef} width={width} height={height}>
          <source src={src} type={videoType} />
        </Video>
      </Wrapper>
    </PlayerContextProvider>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Video = styled.video`
  max-height: 100vh;
  width: 100%;
`;
