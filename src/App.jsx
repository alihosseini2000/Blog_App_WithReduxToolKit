import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
// import ErrorPage from "./ErrorPage";
import Posts from "./components/posts/Posts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Posts />,
      // errorElement: <ErrorPage />
    },
  ]);
  return (
    <>
    <RouterProvider router={router}>
      <Navbar />
    </RouterProvider>
    </>
    
  );
}

export default App;
