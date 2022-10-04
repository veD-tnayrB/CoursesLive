import { Routes, Route } from 'react-router-dom';
import Courses from 'src/views/courses';
import Home from 'src/views/home';
import Users from 'src/views/users';
import Signup from 'src/views/signup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/users" element={<Users />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App;