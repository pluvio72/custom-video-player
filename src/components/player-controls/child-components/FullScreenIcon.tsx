import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
`

const Icon = styled.img`
  width: 26px;
  height: 26px;
`

export default function FullscreenIcon({ toggleFullscreen }: Props) {
  return (
    <Wrapper onClick={toggleFullscreen}>
      <Icon src={'images/fullscreen-icon.png'} />
    </Wrapper>
  )
}

interface Props {
  toggleFullscreen: () => void
}
