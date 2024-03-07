# Custom React Player

This project aims to enable you to build a customize the visuals of a native HTML video player in react.

If you would like to request features open an [issue](https://github.com/pluvio72/custom-video-player/issues), or even better open a PR. If you have questions or need help please ask in [Github Discussions](https://github.com/pluvio72/custom-video-player/discussions)!

## Get started

In the project directory run:

```bash
yarn add custom-react-player
or
npm install custom-react-player
```

(TS support is natively included)

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
- `width`
- `height`
- `src`
- `videoType`

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

## Notes

To make sure fullscreen works correctly you must set your `<body>` to have margin/padding of 0:

```css
body {
  padding: 0;
  margin: 0;
}
```

## What is looks like

https://github.com/pluvio72/custom-video-player/assets/39244972/edf1a9ba-6a97-4379-b03d-7d10889a23ef
