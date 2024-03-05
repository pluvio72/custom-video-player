import { FC } from 'react'
import { IconProps } from '../../types'
import { Icon } from './Icon'

export const PlayIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewbox='-5 0 28 28'>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-419.000000, -571.000000)' fill='#FFFFFF'>
        <path
          d='M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554'
          id='play'
        />
      </g>
    </g>
  </Icon>
)
