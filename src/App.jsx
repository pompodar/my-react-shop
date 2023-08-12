import './App.css'
import Shop from './Shop.jsx'
import { Routes, Route } from 'react-router-dom';
import Checkout from "./Checkout.jsx"
import ThankYou from "./ThankYou.jsx"


// 

function App() {

  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<Shop />} />
    </Routes>
  )
}

export default App
