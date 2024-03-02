import { FC, PropsWithChildren } from 'react'
import { IconProps } from '../../types'
import styled from 'styled-components'

export const Icon: FC<PropsWithChildren<IconProps>> = ({
  children,
  height = 32,
  width = 32,
  viewbox,
  onClick,
}) => {
  return (
    <Svg viewBox={viewbox} width={width} height={height} version='1.1' onClick={onClick}>
      {children}
    </Svg>
  )
}

const Svg = styled.svg`
  cursor: pointer;
`
