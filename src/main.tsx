import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.tsx'
import Register from './Pages/Register.tsx'
import Blog from './Pages/Blog.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import RootPage from './Pages/RootPage.tsx'
import Home from './Pages/Home.tsx'
import Plan from './Pages/Plan.tsx'
import Calender from './Pages/Calender.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      }, 
      {
        path: '/Calender',
        element: <Calender />,
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/plan',
        element: <Plan />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);