import "./ProgressBar.css";

import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";

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

export default function ProgressBar({ duration, progress, seekTo }: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(e.currentTarget.value))
  }

  return (
    <Wrapper>
      <input
        className="sliderInput"
        type="range"
        min="0"
        max={duration.toString()}
        value={progress}
        onChange={onChange}
      />
    </Wrapper>
  );
}

interface Props {
  duration: number;
  progress: number;
  seekTo: (value: number) => void;
}
