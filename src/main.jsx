import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Routes/Root/Root';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Home from './Routes/Home/Home';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register';
import AuthProvider from './Providers/AuthProvider';
import Services from './Components/AllServices/Services';
import ServiceDetail from './Components/ServiceDetail/ServiceDetail';
import AddServices from './Components/AddServices/AddServices';
import MyBookings from './Components/MyBookings/MyBookings';
import PrivateRoute from './Routes/PrivateRoute/PrivateRoute';
import MyServices from './Components/MyServices/MyServices';
import UpdateService from './Components/UpdateService.jsx/UpdateService';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/services")
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/services",
        element: <Services></Services>,
        loader: () => fetch("http://localhost:5000/services")
      },
      {
        path: "/services/:id",
        element: <PrivateRoute><ServiceDetail></ServiceDetail></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: "/addServices",
        element: <PrivateRoute><AddServices></AddServices></PrivateRoute>
      },
      {
        path: "/myBookings",
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      },
      {
        path: "/myServices",
        element: <PrivateRoute><MyServices></MyServices></PrivateRoute>
      },
      {
        path: "updateService/:id",
        element: <PrivateRoute><UpdateService></UpdateService></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
