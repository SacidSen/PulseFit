import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.tsx'
import Register from './Pages/Register.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import RootPage from './Pages/RootPage.tsx'
import Home from './Pages/Home.tsx' 
import Calender from './Pages/Calender.tsx'
import WorkoutPlan from './Pages/WorkoutPlan.tsx'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'
import ProtectedRoute from './Components/ProtectedRoute' // import your new component
import Exercises from './Pages/Exercises.tsx';

export const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/calender',
        element: (
          <ProtectedRoute>
            <Calender />
          </ProtectedRoute>
        ),
      },
      {
        path: '/WorkoutPlan',
        element: (
          <ProtectedRoute>
            <WorkoutPlan />
          </ProtectedRoute>
        ),
      },{
        path: '/exercises',
        element: (
          <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
