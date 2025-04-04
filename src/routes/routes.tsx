import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths'
import Layout from '../components/Layout'
import HomePage from '../pages/users/HomePage'
import UserDetailPage from '../pages/userDetails/UserDetailPage'
import EditUser from '../pages/editUser/EditUserPage'


const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.USER_DETAIL,
        element: <UserDetailPage />,
      },
      {
        path: ROUTE_PATHS.EDIT_USER,
        element: <EditUser />,
      }
    ],
  },
]

export const router = createBrowserRouter(routes)
