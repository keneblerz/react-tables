import { MouseEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import { RundownListObject } from '../../configs/enps-interface'

interface Props {
  listObject: RundownListObject
  // rowOnClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

const ListLineItem = (props: Props) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: 'grey',
    padding: 8,
    textAlign: 'center',
    color: 'white',
    width: 'auto',
    overflow: 'auto',
  }))

  return (
    <Grid
      key={`${props.listObject.Index}`}
      id={`${props.listObject.Index}`}
      sx={{ height: 'auto' }}
      item
      xs={12}
    >
      <Card key={`${props.listObject.Index}`} id={`${props.listObject.Index}`}>
        <CardActionArea
          component={RouterLink}
          to={`/rundown/${props.listObject.Guid}`}
          // onClick={props.rowOnClick}
        >
          <Item elevation={1}>
            <Typography
              key={`${props.listObject.Index}`}
              id={`${props.listObject.Index}`}
              gutterBottom
              variant="h5"
              component="div"
            >
              {props.listObject.RundownName}
            </Typography>
          </Item>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default ListLineItem

/**<TableRow
      selected={true}
      key={`${props.listObject.Index}`}
      id="rundown-row"
      onClick={(event: MouseEvent<HTMLTableRowElement>) => {
        props.rowOnClick(event)
      }}
    >
      <TableCell
        style={{ width: 'auto' }}
        align="center"
        id={`${props.listObject.Index}`}
      >
        {props.listObject.RundownName}
      </TableCell>
    </TableRow> */

/** 
 * Idea 1
     * <Card>
    <CardActionArea component={RouterLink} to="/questions">
        <CardContent>
            <Typography>Click me!</Typography>
        </CardContent>
    </CardActionArea>
</Card>

* Idea 2
<Card>
      <ButtonBase
          className={props.classes.cardAction}
          onClick={event => { ... }}
      >
        <CardMedia ... />
        <CardContent>...</CardContent>
      </ButtonBase>
    </Card>
     */
