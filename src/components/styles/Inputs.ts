import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Input1 = styled(motion.input)`
  font-size: 1.5rem;
  width: 100%;
  color: #ef233c;
  --thumb-height: 0.7em;
  --track-height: 0.125em;
  --track-color: rgba(200, 200, 200, 0.4);
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

export const Input2 = styled.input`
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: none;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    box-shadow:
      0px 0px 0px #000000,
      0px 0px 0px #0d0d0d;
    background: #f07167;
    border-radius: 25px;
    border: 0px solid #111111;
  }

  &::-webkit-slider-thumb {
    box-shadow:
      0px 0px 0px #000000,
      0px 0px 0px #0d0d0d;
    border: 0px solid #111111;
    height: 0px;
    width: 0px;
    border-radius: 7px;
    background: #111111;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #f07167;
  }

  &::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow:
      0px 0px 0px #111111,
      0px 0px 0px #0d0d0d;
    background: rgba(0, 0, 0, 0.2);
    border: 0px solid #111111;
  }

  &::-moz-range-thumb {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &::-moz-range-progress {
    background: #f07167;
    height: 6px;
  }

  &::-ms-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #f07167;
    border: 0px solid #111111;
    border-radius: 50px;
    box-shadow:
      0px 0px 0px #111111,
      0px 0px 0px #0d0d0d;
  }

  &::-ms-fill-upper {
    background: #f07167;
    border: 0px solid #111111;
    border-radius: 50px;
    box-shadow:
      0px 0px 0px #111111,
      0px 0px 0px #0d0d0d;
  }

  &::-ms-thumb {
    box-shadow:
      0px 0px 0px #111111,
      0px 0px 0px #0d0d0d;
    border: 0px solid #111111;
    height: 15px;
    width: 25px;
    border-radius: 7px;
    background: #111111;
    cursor: pointer;
  }

  &:focus::-ms-fill-lower {
    background: #f07167;
  }

  &:focus::-ms-fill-upper {
    background: #f07167;
  }
`
