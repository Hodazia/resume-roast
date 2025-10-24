import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Roast from "./pages/Roast"


export default function() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roast" element={<Roast />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}