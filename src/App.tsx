import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import CreateBookPage from "./pages/CreateBookPage";
import UpdateBookPage from "./pages/UpdateBookPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/update-book/:bookId" element={<UpdateBookPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
