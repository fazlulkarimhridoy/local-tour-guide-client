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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: ()=>fetch("http://localhost:5000/services")
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
        loader: ()=>fetch("http://localhost:5000/services")
      },
      {
        path: "/services/:id",
        element: <PrivateRoute><ServiceDetail></ServiceDetail></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: "/addServices",
        element: <PrivateRoute><AddServices></AddServices></PrivateRoute>
      },
      {
        path: "/myBookings",
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
