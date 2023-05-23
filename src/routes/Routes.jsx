import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import News from '../pages/Home/News/News';
import Destination from '../pages/Home/Destination/Destination';
import Blog from '../pages/Home/Blog/Blog';
import Contact from '../pages/Home/Contact/Contact';
import Place from "../pages/Home/Place/Place";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/destination')
            },
            {
                path: "news",
                element: <News></News>
            },
            {
                path: "destination",
                element: <Destination></Destination>
            },
            {
                path: "destination/:id",
                element: <PrivateRoute><Place></Place></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/destination/${params.id}`)
            },
            {
                path: "blog",
                element: <Blog></Blog>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            }
        ]
    },
]);

export default router;