import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"

import NavBar from "./components/NavBar"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import TaskDetail from "./pages/TaskDetail"

const App = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="container">
          <h1>Task Manager</h1>
          <NavBar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
          </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter >
  )
}

export default App

