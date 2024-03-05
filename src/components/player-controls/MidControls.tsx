import styled from 'styled-components'
import { PlayerProps } from '../../types'

import { PlayIcon, PauseIcon } from '../icons'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function MidControls({ playing, midControls, togglePlayState }: Props) {
  if (midControls) {
    return midControls(playing, togglePlayState)
  }

  const [showIcon, setShowIcon] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  // EVENT (click): handling animating icon in/out
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleOnClick = () => {
      setShowIcon(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setShowIcon(false), 200)
    }

    if (divRef.current) {
      divRef.current.onclick = handleOnClick
    }
  }, [])

  return (
    <Wrapper onClick={togglePlayState} ref={divRef} animate={{ opacity: showIcon ? 1 : 0 }}>
      <IconWrapper>
        {playing ? <PauseIcon onClick={togglePlayState} /> : <PlayIcon onClick={togglePlayState} />}
      </IconWrapper>
    </Wrapper>
  )
}

interface Props {
  playing: boolean
  midControls: PlayerProps['midControls']
  togglePlayState: () => void
}

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 1rem;
  display: grid;
  place-items: center;
`
