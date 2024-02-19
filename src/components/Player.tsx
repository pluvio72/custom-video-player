import { useEffect, useRef, useState } from "react";
import PlayerControls from "./PlayerControls/PlayerControls";
import styled from "styled-components";

export function Player() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement>();
  

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 0.1;
      setVideoEl(playerRef.current);
    }
  }, [playerRef]);  

  return (
    <Wrapper ref={playerWrapperRef}>
      <PlayerControls videoEl={videoEl} wrapperRef={playerWrapperRef} />
      <Video ref={playerRef}>
        <source src="adventure_time_s1ep4.mp4" type="video/mp4" />
      </Video>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Video = styled.video`
  max-height: 100vh;
  width: 100%;
`;