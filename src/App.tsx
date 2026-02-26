import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Practice from "./routes/Practice";
import Progress from "./routes/Progress";
import Rules from "./routes/Rules";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/rules">Rules</Link>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
