import './VolumeSlider.css'

import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { usePlayerContext } from '../../../hooks/usePlayerContext'
import { PContext } from '../../../context/PlayerContext'
import { getSliderClassName } from '../../../util/style'

export default function VolumeSlider({ changeVolume, toggleMute }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const { state } = usePlayerContext(PContext)

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (state.accentColor) {
        inputRef.current.style.color = state.accentColor
      }
    }
  }, [inputRef])

  const showSlider = () => setShowVolumeSlider(true)
  const hideSlider = () => setShowVolumeSlider(false)

  const setVolume = (e: ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.currentTarget.value))
  }

  return (
    <Wrapper onMouseOver={showSlider} onMouseOut={hideSlider}>
      <SliderWrapper>
        <input
          ref={inputRef}
          className={`volumeSlider ${getSliderClassName(state.style)}`}
          type='range'
          onChange={setVolume}
          value={state.currentVolume}
          min={'0'}
          max={'1'}
          step={'0.01'}
          style={{ display: showVolumeSlider ? 'block' : 'none' }}
        />
      </SliderWrapper>
      <Icon src={'images/volume-icon.png'} onClick={toggleMute} />
    </Wrapper>
  )
}

interface Props {
  changeVolume: (newVol: number) => void
  toggleMute: () => void
}

const Wrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`

const Icon = styled.img`
  width: 28px;
  height: 28px;
`

const SliderWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`
