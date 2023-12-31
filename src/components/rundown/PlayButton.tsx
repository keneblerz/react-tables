import React, { MouseEvent } from 'react'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  play: (event: MouseEvent<HTMLButtonElement>) => void
}

const PlayButton = (props: Props) => {
  return (
    <Button
      id="playbutton"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        props.play(event)
      }}
    >
      <PlayArrowIcon />
    </Button>
  )
}

export default PlayButton
