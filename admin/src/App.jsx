import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminNavbar from "./components/AdminNavBar"
import AdminHero from "./pages/AdminHero"
import AdminHomepage from "./pages/AdminHomepage"

const App = () => {
  return (
    <BrowserRouter>
      <AdminNavbar></AdminNavbar>
      <Routes>
        <Route path="/" element={<AdminHomepage></AdminHomepage>}></Route>
        <Route path="/doctor/dashboard" element={<AdminHero></AdminHero>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
