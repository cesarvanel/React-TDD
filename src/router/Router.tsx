import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components/Layout/Layout";
import HomeView from "../ui/pages/Home/view/HomeView";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/", 
          element:<HomeView />

        }
      ]
    },
    
  ]);