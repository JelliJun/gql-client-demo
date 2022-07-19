import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Agencies from './Agencies';
import Agency from './Agency';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Agencies />} />
        <Route path='agencies/:id' element={<Agency />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
