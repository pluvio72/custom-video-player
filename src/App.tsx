import './App.css';

import { Player } from './components/PlayerWrapper';
import { VideoTypes } from './types';

function App() {
  return (
    <div className="App">
      <Player src="adventure_time_s1ep4.mp4" videoType={VideoTypes.mp4}/>
    </div>
  );
}

export default App;
