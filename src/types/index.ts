import { HTMLAttributes, ReactNode } from "react";

export type VideoDimensionInfo = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export enum VideoTypes {
  mp4 = "video/mp4",
}

export type PlayerProps = {
  accentColor?: Required<HTMLAttributes<HTMLElement>["color"]>;
  bottomPlayIcon?: ReactNode;
  height?: number;
  src: string | undefined;
  videoType: VideoTypes;
  volumeIcon?: ReactNode;
  width?: number;
  seekBar?: (
    progress: number,
    duration: number,
    seekTo: (timestamp: number) => void
  ) => ReactNode;
  volumeSlider?: (changeVolume: (newVolume: number) => void) => ReactNode;
};

export type PlayerContext = {
  state: {
    accentColor?: PlayerProps['accentColor'];
  },
  setState: (key: any) => void;
}