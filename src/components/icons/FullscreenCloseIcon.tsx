import { FC } from 'react'
import { IconProps } from '../../types'
import { Icon } from './Icon'

export const FullscreenCloseIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewbox='0 0 32 32'>
    <path d='M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28' />
  </Icon>
)
