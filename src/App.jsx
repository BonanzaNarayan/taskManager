import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import LowP from "./pages/LowP/LowP"
import Medium from "./pages/Medium/Medium"
import High from "./pages/High/High"
import Auth from "./pages/Auth/Auth"
import Completed from "./pages/Completed/Completed"
import Pending from "./pages/Pending/Pending"
import Favorite from "./pages/Favorite/Favorite"
import DeuDate from "./pages/DeuDate/DeuDate"

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="low" element={<LowP />} />
        <Route path="medium" element={<Medium />} />
        <Route path="high" element={<High />} />
        <Route path="signin" element={<Auth />} />
        <Route path="completed" element={<Completed />} />
        <Route path="pending" element={<Pending />} />
        <Route path="favorites" element={<Favorite />} />
        <Route path="dueDate" element={<DeuDate />} />
    </Routes>
  )
}

export default App
