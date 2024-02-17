import "./VolumeSlider.css";

import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
`;

const SliderWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`;

export default function VolumeSlider({ changeVolume }: Props) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const showSlider = () => setShowVolumeSlider(true);
  const hideSlider = () => setShowVolumeSlider(false);

  const setVolume = (e: ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.currentTarget.value));
  };

  return (
    <Wrapper onMouseOver={showSlider} onMouseOut={hideSlider}>
      {showVolumeSlider && (
        <SliderWrapper>
          <input
            className="sliderInput volumeSlider"
            type="range"
            onChange={setVolume}
            min={"0"}
            max={"1"}
            step={"0.01"}
          />
        </SliderWrapper>
      )}
      <Icon src={"images/volume-icon.png"} />
    </Wrapper>
  );
}

interface Props {
  changeVolume: (newVol: number) => void;
}
