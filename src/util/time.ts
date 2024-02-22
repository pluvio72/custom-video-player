export const secondsToTimestamp = (seconds: number) => {
  const _minutes = Math.floor(seconds / 60)
  let _seconds: string | number = Math.floor(seconds % 60)

  if (_seconds < 10) {
    _seconds = `0${_seconds}`
  }
  return `${_minutes}:${_seconds}`
}
