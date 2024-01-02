import { Grid } from '@mui/material'
import { RundownListObject } from '../../configs/enps-interface'
import ListLineItem from './ListLineItem'

interface Props {
  rundownList: RundownListObject[]
  // rowOnClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

const RundownList = (props: Props) => {
  /** Function that retrieves the updated list after interval and returns a new rundownList */

  return (
    <Grid container justifyContent="flex-end" spacing={1}>
      {props.rundownList.map((r) => {
        return (
          <ListLineItem
            listObject={r}
            // rowOnClick={props.rowOnClick}
            key={r.Index}
          />
        )
      })}
    </Grid>
  )
}
export default RundownList
