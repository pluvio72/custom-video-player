import "./App.css";

import { Player } from "./components/PlayerWrapper";
import { VideoPlayerStyles, VideoTypes } from "./types";

function App() {
  return (
    <div className="App">
      <Player
        src="adventure_time_s1ep4.mp4"
        videoType={VideoTypes.mp4}
        style={VideoPlayerStyles.three}
        // bottomControls={(progress, duration, seekTo, changeVolume) => {
        //   return (
        //     <div>
        //       <span id="rangeValue">0</span>
        //       <input className="test" type="range" value={progress} min="0" max={duration.toString()} onChange={seekTo} />
        //     </div>
        //   )
        // }}
      />
    </div>
  );
}

export default App;
