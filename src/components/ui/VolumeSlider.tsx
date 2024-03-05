import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { usePlayerContext } from '../../hooks/usePlayerContext'
import { PContext } from '../../context/PlayerContext'
import { getSliderClassName } from '../../util/style'
import { VolumeIcon, VolumeMuteIcon } from '../icons'
import { Input1 } from '../styles/Inputs'

export default function VolumeSlider({ changeVolume, toggleMute }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const { state, setState } = usePlayerContext(PContext)

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (state.accentColor) {
        inputRef.current.style.color = state.accentColor
      }
    }
  }, [inputRef])

  const onMouseOverSlider = () => {
    setShowVolumeSlider(true)
    setState((prev) => ({
      ...prev,
      volumeSliderOpen: true,
    }))
  }

  const onMouseLeaveSlider = () => {
    setShowVolumeSlider(false)
    setState((prev) => ({
      ...prev,
      volumeSliderOpen: false,
    }))
  }

  const setVolume = (e: ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.currentTarget.value))
  }

  const renderIcon = () => {
    if (state.currentVolume > 0) {
      return <VolumeIcon onClick={toggleMute} width={26} height={26} />
    } else {
      return <VolumeMuteIcon onClick={toggleMute} width={26} height={26} />
    }
  }

  return (
    <Wrapper onMouseOver={onMouseOverSlider} onMouseOut={onMouseLeaveSlider}>
      <SliderWrapper>
        <Input
          ref={inputRef}
          className={getSliderClassName(state.style)}
          type='range'
          onChange={setVolume}
          value={state.currentVolume}
          min={'0'}
          max={'1'}
          step={'0.01'}
          style={{ display: showVolumeSlider ? 'block' : 'none' }}
        />
      </SliderWrapper>
      {renderIcon()}
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

const SliderWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
`

const Input = styled(Input1)`
  transform: rotate(-90deg);
  width: 4rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  cursor: pointer;
`
