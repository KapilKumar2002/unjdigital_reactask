import { Outlet } from 'react-router-dom'
import Header from './header/Header'

const Layout = () => {
  return (
    <div className=''>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
