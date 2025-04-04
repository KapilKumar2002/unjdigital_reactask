import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className=''>
      {/* Add nav/header here if needed */}
      <Outlet />
    </div>
  )
}

export default Layout
