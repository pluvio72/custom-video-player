import "./Scrubber.css";

import {
  ChangeEvent,
  MouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { usePlayerContext } from "../../../hooks/usePlayerContext";
import { PContext } from "../../../context/PlayerContext";
import { getSliderClassName } from "../../../util/style";
import { secondsToTimestamp } from "../../../util/time";
import { motion } from "framer-motion";

export default function ProgressBar({ duration, progress, seekTo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state } = usePlayerContext(PContext);
  const [labelOffset, setLabelOffset] = useState<number>();
  const [labelTimestamp, setLabelTimestamp] = useState<number>(0);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (state.accentColor) {
        inputRef.current.style.color = state.accentColor;
      }
    }
  }, [inputRef, state.accentColor]);

  const showTooltip = (e: MouseEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      let percents = e.clientX / (inputRef.current.offsetWidth + inputRef.current.offsetLeft);
      let max = parseInt(inputRef.current.max)
      setLabelTimestamp(Math.floor(percents * max))
      setLabelOffset((e.clientX - inputRef.current.offsetLeft) - 24)
    }
  }

  const hideTooltip = () => setLabelOffset(undefined);

  return (
    <Wrapper>
      <motion.input
        whileHover={state.style === 2 ? { scaleY: 2 } : undefined}
        ref={inputRef}
        className={getSliderClassName(state.style)}
        type="range"
        min="0"
        max={duration.toString()}
        value={progress}
        onChange={seekTo}
        onMouseMove={showTooltip}
        onMouseOut={hideTooltip}
      />
      <TooptipWrapper $show={!!labelOffset}>
        <Tooltip $offset={labelOffset} >
          <TooltipText>{secondsToTimestamp(labelTimestamp)}</TooltipText>
        </Tooltip>
      </TooptipWrapper>
    </Wrapper>
  );
}

interface Props {
  duration: number;
  progress: number;
  seekTo: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
  width: 90%;
  height: 3rem;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    display: block;
    position: absolute;
    z-index: 99;
    color: #fff;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1;
    padding: 0.75rem 0;
    pointer-events: none;
  }
`;

const TooptipWrapper = styled.div<{ $show: boolean }>`
  position: absolute;
  pointer-events: none;
  display: ${props => props.$show ? 'block' : 'none'};
`;

const Tooltip = styled.div<{ $offset: number | undefined }>`
  background: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: left;
  position: relative;
  font-size: 0.8rem;
  max-width: 140px;
  bottom: 26px;
  right: ${props => props.$offset ? -props.$offset : 0}px;
`;

const TooltipText = styled.span`
  font-style: italic;
`;