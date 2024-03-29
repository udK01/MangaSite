// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Bookmarks from "./routes/Bookmarks";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bookmarks />} />
      </Routes>
    </Router>
  );
}
