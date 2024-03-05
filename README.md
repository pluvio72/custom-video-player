# Custom React Player

This project aims to enable you to build a customize the visuals of a native HTML video player in react.

If you would like to request features open an [issue](https://test.com), or even better open a PR. If you have questions or need help please ask in [Github Discussions]().

## Get started

In the project directory run:

```bash
yarn add custom-react-player
or
npm install custom-react-player
```

Once installed you can use it in your code:

```javascript
import Player from 'custom-react-player';
...
return (
  <Player
    src={videoURL}
    ...props
  />
)

```

## Customize

The props used to customize the player are:

- `bottomControls`
  - Changes the controls at the bottom of the player
- `midControls`
  - Changes controls in the center e.g. large play/pause button
- `topControls`
  - Any extra controls you want on the top e.g. video name etc.

You can also customize the finer details:

- `volumeIcon`
- `accentColor`

## Props in depth

#### `bottomControls`

Usage as follow:

```javascript
<Player
  bottomControls={(
    progress,
    duration,
    seekTo,
    changeVolume,
    toggleFullscreen,
    toggleMute,
    togglePlay,
  ) => {
    // Render your components here
  }}
/>
```

#### `midControls`

Usage:

```javascript
<Player
  midControls={(playing, togglePlayState) => {
    // Render your components here
  }}
/>
```

#### `topControls`

Usage:

```javascript
<Player
  topControls={() => {
    // Render your components here
  }}
/>
```
