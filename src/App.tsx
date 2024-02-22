import { Player } from "./components/PlayerWrapper";
import { VideoPlayerStyles, VideoTypes } from "./types";

function App() {
  return (
    <div className="App">
      <Player
        src="adventure_time_s1ep4.mp4"
        videoType={VideoTypes.mp4}
        style={VideoPlayerStyles.one}
      />
    </div>
  );
}

export default App;
