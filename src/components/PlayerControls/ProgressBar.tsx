import "./ProgressBar.css";

import React, { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  margin-top: auto;

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
  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value)
  }

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
        onClick={onClick}
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
