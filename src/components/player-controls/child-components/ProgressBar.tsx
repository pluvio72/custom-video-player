import "./ProgressBar.css";

import { ChangeEvent, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { usePlayerContext } from "../../../hooks/usePlayerContext";
import { PContext } from "../../../context/PlayerContext";
import { VideoPlayerStyles } from "../../../types";
import { getSliderClassName } from "../../../util/style";

export default function ProgressBar({ duration, progress, seekTo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state } = usePlayerContext(PContext)
  
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (state.accentColor) {
        inputRef.current.style.color = state.accentColor;
      }
    }
  }, [inputRef])

  return (
    <Wrapper>
      <input
        ref={inputRef}
        className={getSliderClassName(state.style)}
        type="range"
        min="0"
        max={duration.toString()}
        value={progress}
        onChange={seekTo}
      />
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