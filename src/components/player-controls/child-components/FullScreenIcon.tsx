import styled from 'styled-components'
import { FullscreenCloseIcon, FullscreenOpenIcon } from '../../icons'

export default function FullscreenIcon({ isFullscreen, toggleFullscreen }: Props) {
  const renderIcon = () => {
    if (isFullscreen) {
      return <FullscreenCloseIcon height={26} width={26} />
    } else {
      return <FullscreenOpenIcon height={26} width={26} />
    }
  }

  return <Wrapper onClick={toggleFullscreen}>{renderIcon()}</Wrapper>
}

interface Props {
  isFullscreen: boolean
  toggleFullscreen: () => void
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
`
