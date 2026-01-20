import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;