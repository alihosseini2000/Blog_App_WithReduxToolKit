import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
// import ErrorPage from "./ErrorPage";
import HomePage from "./pages/HomePage";
import NotifiCation from "./pages/Notification";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      // errorElement: <ErrorPage />
    },
    {
      path: '/notifications',
      element: <NotifiCation />
    }
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
