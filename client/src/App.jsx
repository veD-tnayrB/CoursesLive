import { Routes, Route } from 'react-router-dom';
import Courses from 'src/views/courses';
import Home from 'src/views/home';
import Users from 'src/views/users';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default App;