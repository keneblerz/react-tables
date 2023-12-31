import '../css/App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TitlerService } from './pages/TitlerService'

import Home from './pages/Home'
import NavBar from './NavBar'
import { Divider } from '@mui/material'
import RunList from './pages/ENPSListings'

const queryClient = new QueryClient()

interface Props {
  window?: () => Window
}

function App(props: Props) {
  const { window } = props
  const [openStatus, setOpen] = React.useState(false)
  // const { guid } = useParams()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Router>
      <NavBar
        openStatus={openStatus}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Divider />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/listing"
          element={
            <QueryClientProvider client={queryClient}>
              <RunList />
            </QueryClientProvider>
          }
        />
        <Route
          path="/rundown/:guid"
          element={
            <QueryClientProvider client={queryClient}>
              <TitlerService />
            </QueryClientProvider>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
