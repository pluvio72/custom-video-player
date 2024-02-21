import { VideoPlayerStyles } from "../types";

export const getSliderClassName = (style: VideoPlayerStyles) => {
  switch (style) {
    case VideoPlayerStyles.one:
      return 'input-slider-1';
    case VideoPlayerStyles.two:
      return 'input-slider-2';
    default:
      return 'input-slider-1';
  }
}