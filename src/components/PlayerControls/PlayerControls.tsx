import { RefObject, useEffect, useState } from "react";
import styled from "styled-components";
import BottomControls from "./BottomControls/BottomControls";
import { motion } from "framer-motion";
import screenfull from "screenfull";
import TopControls from "./BottomControls/TopControls";
import { PlayerProps, VideoDimensionInfo } from "../../types";

export default function PlayerControls({ playerRef, wrapperRef }: Props) {
  const videoEl = playerRef?.current;

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(videoEl?.currentTime || 0);
  const [mouseActive, setMouseActive] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensionInfo>({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(videoEl?.currentTime || 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setMouseActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setMouseActive(false), 2000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!videoEl) return;
    
    setDimensions(videoEl)
    window.addEventListener('resize', () => {
      setDimensions(videoEl)
    })
  }, [videoEl])

  if (!videoEl || !wrapperRef) {
    return <></>;
  }

  const togglePlaying = () => {
    if (playing) {
      videoEl.pause();
      setPlaying(false);
    } else {
      videoEl.play();
      setPlaying(true);
    }
  };

  const setDimensions = (el: Element) => {
    const boundingRect = el.getBoundingClientRect();
    setVideoDimensions({
      height: boundingRect.height,
      width: boundingRect.width,
      left: boundingRect.left,
      top: boundingRect.top
    })
  }

  const seek = (value: number) => {
    videoEl.currentTime = value;
    setCurrentTime(value);
  };

  const changeVolume = (newVolume: number) => (videoEl.volume = newVolume);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };

  return (
    <motion.div
      animate={{ opacity: mouseActive ? 1 : 0 }}
      style={{ opacity: 0 }}
    >
      <Wrapper
        dimensions={videoDimensions}
        className="playerControls"
      >
        <TopControls playing={playing} togglePlayState={togglePlaying} />
        <BottomControls
          progressBarInfo={{
            progress: currentTime,
            duration: videoEl.duration,
            seekTo: seek,
          }}
          changeVolume={changeVolume}
          toggleFullscreen={toggleFullscreen}
        />
      </Wrapper>
    </motion.div>
  );
}

interface Props {
  playerRef?: RefObject<HTMLVideoElement>;
  wrapperRef?: RefObject<HTMLDivElement>;
}

const Wrapper = styled.div<{ dimensions: VideoDimensionInfo }>`
  height: ${(props) => props.dimensions.height}px;
  width: ${(props) => props.dimensions.width}px;
  left: ${(props) => props.dimensions.left}px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  display: flex;
`;