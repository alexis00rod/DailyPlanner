import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar, ProtectedRoutes } from './index'

export const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  },[location])

  return <section className="app">
    <ProtectedRoutes>
      <Outlet />
      <Navbar />
    </ProtectedRoutes>
  </section>
}