import React, { useEffect, useRef, useState } from 'react';
import PlayerControls from './PlayerControls/PlayerControls';

export function Player() {
  const playerRef = useRef<HTMLVideoElement>(null)
  const [videoEl, setVideoEl] = useState<HTMLVideoElement>()

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 0.1
      setVideoEl(playerRef.current)
    }
  }, [playerRef])

  return (
    <div>
      {videoEl &&
        <PlayerControls videoEl={videoEl} />
      }
      <video ref={playerRef} width={853} height={480}>
        <source src="adventure_time_s1ep4.mp4" type="video/mp4" />
      </video>
    </div>
  )
}