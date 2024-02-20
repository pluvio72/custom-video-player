import styled from "styled-components";
import { PlayerProps } from "../../types";

export default function MidControls({
  playing,
  midControls,
  togglePlayState,
}: Props) {
  if (midControls) {
    return midControls(playing, togglePlayState);
  }

  return (
    <Wrapper onClick={() => togglePlayState()}>
      {playing ? (
        <Icon src={"images/pause-icon.png"} onClick={togglePlayState} />
      ) : (
        <Icon src={"images/play-icon.png"} onClick={togglePlayState} />
      )}
    </Wrapper>
  );
}

interface Props {
  playing: boolean;
  midControls: PlayerProps["midControls"];
  togglePlayState: () => void;
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Icon = styled.img`
  top: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: relative;
  transform: translateY(-50%);
`;
