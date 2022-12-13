import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Transfer from "./transfer/Transfer";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CheckTransfer from "./checkTransfer/checkTransfer";
import ConfirmTransfer from "./confirmTransfer/ConfirmTransfer";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/transfer" element={<Transfer />} /> 
          <Route path="/checktransfer" element={<CheckTransfer />} /> 
          <Route path="/confirmtransfer" element={<ConfirmTransfer />} /> 
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
