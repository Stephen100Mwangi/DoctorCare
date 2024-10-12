import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminNavbar from "./components/AdminNavBar"
import AdminHero from "./pages/AdminHero"

const App = () => {
  return (
    <BrowserRouter>
      <AdminNavbar></AdminNavbar>
      <Routes>
        <Route path="/" element={<AdminHero></AdminHero>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
