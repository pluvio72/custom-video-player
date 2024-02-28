import { PropsWithChildren, RefObject, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { VideoDimensionInfo } from '../../types'
import { usePlayerContext } from '../../hooks/usePlayerContext'
import { PContext } from '../../context/PlayerContext'

export default function PlayerControls({
  children,
  playerRef,
  wrapperRef,
}: PropsWithChildren<Props>) {
  const videoEl = playerRef?.current

  const { state, setState } = usePlayerContext(PContext)

  const [mouseActive, setMouseActive] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensionInfo>({
    height: state.viewportHeight,
    width: state.viewportWidth,
  })

  // EVENT (mousemove): handling animating controls in/out
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = () => {
      setMouseActive(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setMouseActive(false), 2000)
    }

    document.body.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  // EVENT (resize): handling reszing viewport
  useEffect(() => {
    if (!videoEl) return

    const handleResize = () => setDimensions(videoEl)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [videoEl])

  useEffect(() => {
    setVideoDimensions({
      height: state.viewportHeight,
      width: state.viewportWidth,
    })
  }, [state.viewportHeight, state.viewportWidth])

  const setDimensions = (el: HTMLVideoElement) => {
    setState((prev) => ({
      ...prev,
      viewportHeight: el.clientHeight,
      viewportWidth: el.clientWidth,
    }))
  }

  if (!videoEl || !wrapperRef) {
    return <></>
  }

  return (
    <Wrapper
      animate={{
        background: mouseActive
          ? 'linear-gradient(0deg,rgba(0, 0, 0, 0.65) 0%,rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%,rgba(0, 0, 0, 0.65) 100%)'
          : '',
        opacity: mouseActive ? 1 : 0,
      }}
      $dimensions={videoDimensions}
      className='playerControls'
    >
      {children}
    </Wrapper>
  )
}

type Props = {
  playerRef?: RefObject<HTMLVideoElement>
  wrapperRef?: RefObject<HTMLDivElement>
}

const Wrapper = styled(motion.div)<{ $dimensions: VideoDimensionInfo }>`
  height: ${(props) => props.$dimensions.height}px;
  width: ${(props) => props.$dimensions.width}px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  display: flex;
  z-index: 10;
`
