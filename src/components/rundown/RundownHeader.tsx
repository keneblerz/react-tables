import React from 'react'

import { TableCell, TableRow } from '@mui/material'

//TableCellis will take all TableCelle BasicContent rows and render TableCellem all on one page
function RundownHeader() {
  // We'll sort out how it looks after we figure out TableCelle logic
  return (
    <TableRow>
      <TableCell align="center">Page Number</TableCell>
      <TableCell align="center">MOS Story</TableCell>
      {/* <TableCell>MOS Object Slug</TableCell> */}
      <TableCell align="center">CG Line 1</TableCell>
      <TableCell align="center">CG Line 2</TableCell>
    </TableRow>
  )
}

export default RundownHeader
