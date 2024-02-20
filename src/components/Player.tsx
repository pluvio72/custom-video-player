import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PlayerControls from "./player-controls/PlayerControls";
import styled from "styled-components";
import { PlayerProps } from "../types";
import { PContext } from "../context/PlayerContext";
import MidControls from "./player-controls/MidControls";
import BottomControls from "./player-controls/BottomControls";
import screenfull from "screenfull";
import { usePlayerContext } from "../hooks/usePlayerContext";
import TopControls from "./player-controls/TopControls";

export function Player({
  height,
  style,
  src,
  videoType,
  width,
  bottomControls,
  midControls,
  topControls
}: PlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    playerRef.current?.currentTime || 0
  );

  const { setState } = usePlayerContext(PContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(playerRef.current?.currentTime || 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  useLayoutEffect(() => {
    if (playerRef.current) {
      const current = playerRef.current;
      setState((prev) => ({
        ...prev,
        duration: current.duration,
      }));
    }
  }, []);

  const togglePlaying = () => {
    if (playing) {
      playerRef.current?.pause();
      setPlaying(false);
    } else {
      playerRef.current?.play();
      setPlaying(true);
    }
  };

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const value = Number(e.currentTarget.value);

      playerRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const changeVolume = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };

  const onLoad = () => {
    if (playerRef.current) {
      const boundingRect = playerRef.current.getBoundingClientRect();
      const duration = playerRef.current.duration;

      setState((prev) => ({
        ...prev,
        viewportHeight: boundingRect.height,
        viewportWidth: boundingRect.width,
        duration,
      }));
    }
  };

  return (
    <Wrapper ref={playerWrapperRef} id="player">
      <PlayerControls playerRef={playerRef} wrapperRef={playerWrapperRef}>
        <TopControls topControls={topControls} />
        <MidControls
          midControls={midControls}
          playing={playing}
          togglePlayState={togglePlaying}
        />
        <BottomControls
          bottomControls={bottomControls}
          progress={currentTime}
          seekTo={seek}
          changeVolume={changeVolume}
          toggleFullscreen={toggleFullscreen}
        />
      </PlayerControls>
      <Video
        ref={playerRef}
        width={width}
        height={height}
        onLoadedMetadata={onLoad}
      >
        <source src={src} type={videoType} />
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
