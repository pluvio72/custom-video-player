import { FC, PropsWithChildren } from 'react'
import { IconProps } from '../../types'

export const Icon: FC<PropsWithChildren<IconProps>> = ({
  children,
  height = 32,
  width = 32,
  viewbox,
  onClick,
}) => {
  return (
    <svg viewBox={viewbox} width={width} height={height} version='1.1' onClick={onClick}>
      {children}
    </svg>
  )
}
