import {
  PropsWithChildren,
  RefObject,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { VideoDimensionInfo } from "../../types";
import { usePlayerContext } from "../../hooks/usePlayerContext";
import { PContext } from "../../context/PlayerContext";

export default function PlayerControls({
  children,
  playerRef,
  wrapperRef,
}: PropsWithChildren<Props>) {
  const videoEl = playerRef?.current;

  const { state, setState } = usePlayerContext(PContext);

  const [mouseActive, setMouseActive] = useState(true);
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensionInfo>({
    height: state.viewportHeight,
    width: state.viewportWidth,
  });

  // EVENT (mousemove): handling animating controls in/out
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setMouseActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setMouseActive(false), 2000);
    };

    // document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // EVENT (resize): handling reszing viewport
  useEffect(() => {
    if (!videoEl) return;

    const handleResize = () => setDimensions(videoEl);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [videoEl]);

  useEffect(() => {
    setVideoDimensions({
      height: state.viewportHeight,
      width: state.viewportWidth
    })
  }, [state.viewportHeight, state.viewportWidth]);

  const setDimensions = (el: HTMLVideoElement) => {
    const boundingRect = el.getBoundingClientRect();

    setState(prev => ({
      ...prev,
      viewportHeight: boundingRect.height,
      viewportWidth: boundingRect.width,
    }))
  }

  if (!videoEl || !wrapperRef) {
    return <></>;
  }

  return (
    <motion.div
      animate={{ opacity: mouseActive ? 1 : 0 }}
      style={{ opacity: 0 }}
    >
      <Wrapper $dimensions={videoDimensions} className="playerControls">
        {children}
      </Wrapper>
    </motion.div>
  );
}

type Props = {
  playerRef?: RefObject<HTMLVideoElement>;
  wrapperRef?: RefObject<HTMLDivElement>;
};

const Wrapper = styled.div<{ $dimensions: VideoDimensionInfo }>`
  height: ${(props) => props.$dimensions.height}px;
  width: ${(props) => props.$dimensions.width}px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  display: flex;
`;
