import React, { FC } from 'react'

import { Player } from '../../src/components/PlayerWrapper'

const App: FC = () => {
  return (
    <Player src={'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'} width={800} height={483} />
  )
}

export default App
