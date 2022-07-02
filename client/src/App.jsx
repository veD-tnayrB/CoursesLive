import { Routes, Route } from 'react-router-dom';
import { HOME_ROUTE } from './constants/routes/client';
import Home from './views/home';

function App() {

  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
    </Routes>
  )
}

export default App;