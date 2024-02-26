import { FC } from 'react'
import { IconProps } from '../../types'
import { Icon } from './Icon'

export const VolumeMuteIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewbox={'0 0 48 48'}>
    <path d='M30,22.2V5a1,1,0,0,0-1-1,1.1,1.1,0,0,0-.7.3l-8.4,7.8Z' fill='#FFFFFF' />
    <path
      d='M40.4,38.6l-32-32A2,2,0,0,0,5.6,9.4L11.2,15H8a2,2,0,0,0-2,2V31a2,2,0,0,0,2,2h8.7L28.3,43.7a1.1,1.1,0,0,0,.7.3,1,1,0,0,0,1-1V33.8l7.6,7.6a1.9,1.9,0,0,0,2.8,0A1.9,1.9,0,0,0,40.4,38.6Z'
      fill='#FFFFFF'
    />
  </Icon>
)
