import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import { Privacy } from "./Pages/Privacy";
import { ToastContainer } from "react-toastify";
import { Transaction } from "./Pages/Transaction";
import { Landingpage } from "./Pages/Landingpage";
import Aos from 'aos';

function App() {
  const [count, setCount] = useState(0);
   useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);


  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Landingpage />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/privacy-policy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
