import { FC } from 'react'
import { IconProps } from '../../types'
import { Icon } from './Icon'

export const VolumeIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewbox={'0 0 48 48'}>
    <path
      d='M29,4a.9.9,0,0,0-.7.3L16.7,15H8a2,2,0,0,0-2,2V31a2,2,0,0,0,2,2h8.7L28.3,43.7a.9.9,0,0,0,.7.3,1,1,0,0,0,1-1V5a1,1,0,0,0-1-1Z'
      fill='#FFFFFF'
    />
    <path
      d='M36,42a2.1,2.1,0,0,1-1.6-.8,2,2,0,0,1,.4-2.8,18,18,0,0,0,0-28.8,2,2,0,1,1,2.4-3.2A22.4,22.4,0,0,1,46,24a22.4,22.4,0,0,1-8.8,17.6A1.7,1.7,0,0,1,36,42Z'
      fill='#FFFFFF'
    />
    <path d='M34,15.5v17a.5.5,0,0,0,.9.3,14,14,0,0,0,0-17.6A.5.5,0,0,0,34,15.5Z' fill='#FFFFFF' />
  </Icon>
)
