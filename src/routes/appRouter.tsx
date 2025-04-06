import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import UserDetailPage from '../pages/userDetails/UserDetailPage'
import HomePage from '../pages/homepage/HomePage'
import UserFormPage from '../pages/editUser/UserFormPage'
import routes from './routePaths'
import ErrorPage from '../pages/error/error_page'

const appRouter: RouteObject[] = [
  {
    path: routes.root,
    element: <Layout />,
    errorElement: <ErrorPage onRetry={()=>{}} message='Error' />, // ← Add this line
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.userDeatails,
        element: <UserDetailPage />,
      },
      {
        path: routes.editUser,
        element: <UserFormPage />,
      },
      {
        path: routes.createUser,
        element: <UserFormPage />,
      }
    ],
  },
  {
    path: '*',
    element: <ErrorPage onRetry={()=>{}} message='Error' />, // ← Catch-all fallback
  },
]

export const router = createBrowserRouter(appRouter)
