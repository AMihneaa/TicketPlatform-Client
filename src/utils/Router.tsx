import {
    createBrowserRouter,
} from "react-router";
  
import  HomePage  from "../pages/Home.pages";
import UserRegister from "../pages/UserRegister.page";

  export const router = createBrowserRouter([
    {
      path: "/",
      Component: HomePage,
    },
    {
        path: "/register",
        Component: UserRegister,
    }
  ]);
  
  