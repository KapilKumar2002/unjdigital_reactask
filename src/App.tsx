import { RouterProvider } from "react-router-dom"
import { router } from "./routes/appRouter"
import "./index.css"

const App = () => {
  return <RouterProvider router={router} />

}

export default App
