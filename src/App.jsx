import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"

import NavBar from "./components/NavBar"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

const App = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter >
  )
}

export default App

