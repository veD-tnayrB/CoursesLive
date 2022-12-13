import { useUserContext } from 'src/contexts/user/user.context';
import List from 'src/components/common/list';
import Course from './course';
import './courses.scss';

export default function Courses() {
	const { selectedUser } = useUserContext();
	const elements = selectedUser.courses.map((course) => <Course course={course} />);

	const list = elements.length > 0 ? elements : PreloadList;

	return (
		<div className="user-course-section">
			<h3 className="title">{selectedUser.name} is suscribed to:</h3>
			<List>{elements}</List>
		</div>
	);
}
