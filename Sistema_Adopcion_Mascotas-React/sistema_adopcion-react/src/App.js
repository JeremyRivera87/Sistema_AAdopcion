import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;