const OnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
  if (type === 'number') {
    if (
      e.key === '-' ||
      e.key === 'e' ||
      e.key === 'E' ||
      e.key === '.' ||
      e.key === '+'
    ) {
      e.preventDefault()
    }
  }
}
const OnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
  if (type === 'number') {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
    }
  }
}

export { OnKeyPress, OnKeyDown }
