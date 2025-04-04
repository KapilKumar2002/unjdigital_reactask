import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths'
import Layout from '../components/Layout'
import HomePage from '../pages/users/HomePage'
import UserDetailPage from '../pages/userDetails/UserDetailPage'


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
    ],
  },
]

export const router = createBrowserRouter(routes)
