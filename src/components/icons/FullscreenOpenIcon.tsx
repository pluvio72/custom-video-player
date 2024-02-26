import { FC } from 'react'
import { IconProps } from '../../types'
import { Icon } from './Icon'

export const FullscreenOpenIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewbox='0 0 32 32'>
    <path d='M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28' />
  </Icon>
)
