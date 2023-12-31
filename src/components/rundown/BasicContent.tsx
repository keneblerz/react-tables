import React, { MouseEvent } from 'react'
import { TableCell, TableRow } from '@mui/material'

// This component will take the ENPSParseData and...
// Same as the ENPS App, This will be rendered as each individual entry on the rundown
// Consisting as PageNum, MOS Story/Title, MOSObject Name, CG Line 1, CG Line 2

//Change of plans. Likely better to Click-to-highlight rows and then play the contents

interface Props {
  pageNum: string
  cg1: string
  cg2: string
  title: string
  rowOnClick: (event: MouseEvent<HTMLTableRowElement>) => void
  rowId: number | unknown
}

function BasicContent(props: Props) {
  return (
    <TableRow
      selected={true}
      key={`${props.rowId}`}
      id="rundown-row"
      onClick={(event: MouseEvent<HTMLTableRowElement>) => {
        props.rowOnClick(event)
      }}
    >
      <TableCell align="center" id={`${props.rowId}`}>
        {props.pageNum}
      </TableCell>
      <TableCell align="center" id={`${props.rowId}`}>
        {props.title}
      </TableCell>
      {/* <TableCell align="center" id={`${props.rowId}`>{props.mosObjSlugs}</TableCell> */}
      <TableCell align="center" id={`${props.rowId}`}>
        {props.cg1}
      </TableCell>
      <TableCell align="center" id={`${props.rowId}`}>
        {props.cg2}
      </TableCell>
    </TableRow>
  )
}

export default BasicContent
