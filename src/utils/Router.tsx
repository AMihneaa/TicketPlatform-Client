import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/pages/layout"
import HomePage from "@/pages/Home.pages"
import UserRegister from "@/pages/UserRegister.page"
import UserLogin from "@/pages/UserLogin.page"
import MyTicketsPage from "@/pages/Ticket"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        element: <UserRegister />,
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "test",
        element: <MyTicketsPage />,
      },
    ],
  },
])
