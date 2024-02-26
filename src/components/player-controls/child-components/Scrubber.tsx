import { ChangeEvent, MouseEvent, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { usePlayerContext } from '../../../hooks/usePlayerContext'
import { PContext } from '../../../context/PlayerContext'
import { getSliderClassName } from '../../../util/style'
import { secondsToTimestamp } from '../../../util/time'

export default function ProgressBar({ duration, progress, seekTo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state } = usePlayerContext(PContext)
  const [labelOffset, setLabelOffset] = useState<number>()
  const [labelTimestamp, setLabelTimestamp] = useState<number>(0)

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (state.accentColor) {
        inputRef.current.style.color = state.accentColor
      }
    }
  }, [inputRef, state.accentColor])

  const showTooltip = (e: MouseEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      const percents = e.clientX / (inputRef.current.offsetWidth + inputRef.current.offsetLeft)
      const max = parseInt(inputRef.current.max)
      setLabelTimestamp(Math.floor(percents * max))
      setLabelOffset(e.clientX - inputRef.current.offsetLeft - 24)
    }
  }

  const hideTooltip = () => setLabelOffset(undefined)

  return (
    <Wrapper>
      <Input1
        ref={inputRef}
        className={getSliderClassName(state.style)}
        type='range'
        min='0'
        max={duration.toString()}
        value={progress}
        onChange={seekTo}
        onMouseMove={showTooltip}
        onMouseOut={hideTooltip}
      />
      <TooptipWrapper $show={!!labelOffset}>
        <Tooltip $offset={labelOffset}>
          <TooltipText>{secondsToTimestamp(labelTimestamp)}</TooltipText>
        </Tooltip>
      </TooptipWrapper>
    </Wrapper>
  )
}

interface Props {
  duration: number
  progress: number
  seekTo: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input1 = styled.input`
  font-size: 1.5rem;
  width: 100%;
  color: #ef233c;
  --thumb-height: 0.7em;
  --track-height: 0.125em;
  --track-color: rgba(0, 0, 0, 0.2);
  --brightness-hover: 180%;
  --brightness-down: 80%;
  --clip-edges: 0.125em;
  position: relative;
  background: #fff0;
  overflow: hidden;

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
  }

  &::-moz-range-track,
  &::-moz-range-thumb {
    appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  &::-moz-range-track,
  &::-moz-range-thumb,
  &::-moz-range-progress {
    background: #fff0;
  }

  &::-moz-range-thumb {
    background: currentColor;
    border: 0;
    width: var(--thumb-width, var(--thumb-height));
    border-radius: var(--thumb-width, var(--thumb-height));
    cursor: grab;
  }

  &:active::-moz-range-thumb {
    cursor: grabbing;
  }

  &::-moz-range-track {
    width: 100%;
    background: var(--track-color);
  }

  &::-moz-range-progress {
    appearance: none;
    background: currentColor;
    transition-delay: 30ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    height: calc(var(--track-height) + 1px);
    border-radius: var(--track-height);
  }

  &::-moz-range-thumb,
  &::-moz-range-progress {
    filter: brightness(100%);
  }

  &:hover::-moz-range-thumb,
  &:hover::-moz-range-progress {
    filter: brightness(var(--brightness-hover));
  }

  &:active::-moz-range-thumb,
  &:active::-moz-range-progress {
    filter: brightness(var(--brightness-down));
  }

  &:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    position: relative;
  }

  &::-webkit-slider-thumb {
    --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
    --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

    width: var(--thumb-width, var(--thumb-height));
    background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50%
      calc(var(--track-height) + 1px);
    background-color: currentColor;
    box-shadow: var(--box-fill);
    border-radius: var(--thumb-width, var(--thumb-height));

    filter: brightness(100%);
    clip-path: polygon(
      100% -1px,
      var(--clip-edges) -1px,
      0 var(--clip-top),
      -100vmax var(--clip-top),
      -100vmax var(--clip-bottom),
      0 var(--clip-bottom),
      var(--clip-edges) 100%,
      var(--clip-further) var(--clip-further)
    );
  }

  &:hover::-webkit-slider-thumb {
    filter: brightness(var(--brightness-hover));
    cursor: grab;
  }

  &:active::-webkit-slider-thumb {
    filter: brightness(var(--brightness-down));
    cursor: grabbing;
  }

  &::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100%
      calc(var(--track-height) + 1px);
  }

  &:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }
`

const Wrapper = styled.div`
  width: 90%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

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
`

const TooptipWrapper = styled.div<{ $show: boolean }>`
  position: absolute;
  pointer-events: none;
  display: ${(props) => (props.$show ? 'block' : 'none')};
`

const Tooltip = styled.div<{ $offset: number | undefined }>`
  background: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: left;
  position: relative;
  font-size: 0.8rem;
  max-width: 140px;
  bottom: 26px;
  right: ${(props) => (props.$offset ? -props.$offset : 0)}px;
`

const TooltipText = styled.span`
  font-style: italic;
  font-family: sans-serif;
`
