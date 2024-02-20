import styled from 'styled-components';
import ProgressBar from './child-components/ProgressBar';
import VolumeSlider from './child-components/VolumeSlider';
import FullscreenIcon from './child-components/FullScreenIcon';
import { PlayerProps } from '../../types';
import { usePlayerContext } from '../../hooks/usePlayerContext';
import { PContext } from '../../context/PlayerContext';
import { ChangeEvent } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function BottomControls({ progress, bottomControls, seekTo, changeVolume, toggleFullscreen }: Props) {
  const { state } = usePlayerContext(PContext);

  if (bottomControls) {
    return bottomControls(progress, state.duration, seekTo, changeVolume)
  }
  
  return (
    <Wrapper>
      <ProgressBar duration={state.duration} progress={progress} seekTo={seekTo} />
      <VolumeSlider changeVolume={changeVolume} />
      <FullscreenIcon toggleFullscreen={toggleFullscreen} />
    </Wrapper>
  )
}

interface Props {
  progress: number;
  bottomControls: PlayerProps['bottomControls'];
  changeVolume: (newVol: number) => void;
  seekTo: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen: () => void;
}