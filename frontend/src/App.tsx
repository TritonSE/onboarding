import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home } from "src/pages";
import "src/globals.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
