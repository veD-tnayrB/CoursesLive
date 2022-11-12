import { Routes, Route } from 'react-router-dom';
import Courses from 'src/views/courses';
import Home from 'src/views/home';
import Users from 'src/views/users';
import Signup from 'src/views/signup';
import Login from 'src/views/login';
import Course from 'src/views/course';
import Test from 'src/views/test';

function App() {
	return (
		<Routes>
			{/* Login and Register */}
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />

			{/* Initial */}
			<Route path="/" element={<Home />} />
			<Route path="/courses" element={<Courses />} />
			<Route path="/users" element={<Users />} />

			{/* Detailed */}
			<Route path="/courses/course/:courseId/episode/:episodeId/" element={<Course />}>
				<Route path="test" element={<Test />} />
			</Route>
		</Routes>
	);
}

export default App;
