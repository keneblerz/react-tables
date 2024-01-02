import '../css/App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TitlerService } from './pages/TitlerService'
import Dashboard from './pages/Deshboard'

import Home from './pages/Home'
import NavBar from './NavBar'
import RunList from './pages/ENPSListings'

const queryClient = new QueryClient()

interface Props {
  window?: () => Window
}

function App(props: Props) {
  // const { window } = props
  // const [openStatus, setOpen] = React.useState(false)

  // const handleDrawerToggle = () => {
  //   setOpen((prevState) => !prevState)
  // }

  // const container =
  //   window !== undefined ? () => window().document.body : undefined

  return (
    <Router>
      <NavBar
      // openStatus={openStatus}
      // handleDrawerToggle={handleDrawerToggle}
      />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
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
        {/* <Route
          path="/dashboard"
          element={
            <QueryClientProvider client={queryClient}>
              <Dashboard />
            </QueryClientProvider>
          }
        /> */}
      </Routes>
    </Router>
  )
}

export default App
