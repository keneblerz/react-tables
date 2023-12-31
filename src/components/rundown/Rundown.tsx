import React, { FormEvent, MouseEvent } from 'react'

import BasicContent from './BasicContent'
import RundownHeader from './RundownHeader'

import {
  Table,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
  Box,
} from '@mui/material'
import { RundownObject } from '../../configs/enps-interface'

//Sent this to an variable/constant we can manage later. Or return it.
//Or maybe We REPURPOSE use this component to parse and return specific rundowns.
interface Props {
  rundown: RundownObject[]
  rowOnClick: (event: MouseEvent<HTMLTableRowElement>) => void
  playOnClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function Rundown(rundownprops: Props) {
  return (
    <Box style={{ height: 'auto', width: 'fit-content' }}>
      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <TableContainer sx={{ maxHeight: 'fit-content', minHeight: '100%' }}>
          <Table stickyHeader>
            <TableHead>
              <RundownHeader />
            </TableHead>
            <TableBody>
              {rundownprops.rundown.map((r, index) => {
                const cg1 = r.CG[0]
                const cg2 = r.CG[1]
                return (
                  <BasicContent
                    key={index}
                    rowId={index}
                    pageNum={r.PageNum}
                    title={r.Title}
                    cg1={cg1}
                    cg2={cg2}
                    // mosObjSlugs={r.MOSObjSlugs}
                    rowOnClick={rundownprops.rowOnClick}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default Rundown
