import React from 'react';
import styled from 'styled-components';
import ProgressBar from './child-components/ProgressBar';
import VolumeSlider from './child-components/VolumeSlider';
import FullscreenIcon from './child-components/FullScreenIcon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function BottomControls({ progressBarInfo, changeVolume, toggleFullscreen }: Props) {
  return (
    <Wrapper>
      <ProgressBar duration={progressBarInfo.duration} progress={progressBarInfo.progress} seekTo={progressBarInfo.seekTo} />
      <VolumeSlider changeVolume={changeVolume} />
      <FullscreenIcon toggleFullscreen={toggleFullscreen} />
    </Wrapper>
  )
}

interface Props {
  progressBarInfo: {
    progress: number;
    duration: number;
    seekTo: (value: number) => void;
  }
  changeVolume: (newVol: number) => void;
  toggleFullscreen: () => void;
}