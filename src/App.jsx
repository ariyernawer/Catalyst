import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Participant from "./pages/Participant";
import Organizer from "./pages/Organizer";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/" element={<Landing />} />
        <Route path="/participant" element={<Participant />} />
        <Route path="/organizer" element={<Organizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
