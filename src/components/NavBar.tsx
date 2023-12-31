import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, useParams } from 'react-router-dom'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props

  return (
    <li>
      <ListItemButton component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

interface drawerProps {
  openStatus: boolean
  handleDrawerClose: () => void
  handleDrawerOpen: () => void
}

export const NavDrawer = (props: drawerProps) => {
  const theme = useTheme()
  const { guid } = useParams()

  return (
    <Box
      sx={{
        display: 'display-listitem',
        height: 'fit-content',
      }}
    >
      <CssBaseline />
      <AppBar
        position="sticky"
        open={props.openStatus}
        color="transparent"
        sx={{ width: 'auto' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.openStatus && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            ENPS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'content-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.openStatus}
      >
        <DrawerHeader>
          <IconButton onClick={props.handleDrawerClose}>
            <Typography variant="h6" color="inherit" component="div">
              Options
            </Typography>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemLink to="/" primary="Home" />
          <ListItemLink to="/listing" primary="NASNEWS Rundowns" />
          {/* Global Tables? */}
          {/* <ListItemLink
            to={`/rundown/:${guid}`}
            primary="TitlerService Table"
          /> */}
        </List>
      </Drawer>
    </Box>
  )
}

export default NavDrawer
