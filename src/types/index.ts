import React, { ChangeEvent, HTMLAttributes, ReactNode } from "react";

export type VideoDimensionInfo = {
  width: number;
  height: number;
};

export enum VideoTypes {
  mp4 = "video/mp4",
}

export enum VideoPlayerStyles {
  simple = 1,
  extravagent = 1,
}

export type PlayerProps = {
  accentColor?: string;
  bottomPlayIcon?: ReactNode;
  height?: number;
  src: string | undefined;
  style: VideoPlayerStyles;
  videoType: VideoTypes;
  volumeIcon?: ReactNode;
  width?: number;
  bottomControls?: (
    progress: number,
    duration: number,
    seekTo: (e: ChangeEvent<HTMLInputElement>) => void,
    changeVolume: (newVolume: number) => void
  ) => JSX.Element;
  midControls?: (
    playing: boolean,
    togglePlayState: () => void,
  ) => JSX.Element;
  topControls?: () => JSX.Element;
};

export type PlayerContext = {
  state: {
    accentColor?: PlayerProps["accentColor"];
    duration: number;
    viewportWidth: number;
    viewportHeight: number;
  };
  setState: React.Dispatch<React.SetStateAction<PlayerContext["state"]>>;
};
