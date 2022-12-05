import { useCoursesContext } from 'src/contexts/courses/courses.context';
import { courseService } from 'src/services/courses';
import ValidationInput from 'src/components/common/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import Levels from '../../../levels';

const namePattern = /./;
const levelPattern = /^(Beginner|Mid Level|Senior)$/;
const tagsPattern = /[a-zA-Z]\,/;

const INITIAL_VALUES = {
	name: { value: '', isCorrect: false, validation: namePattern },
	level: { value: 'Beginner', isCorrect: true, validation: levelPattern },
	tags: { value: '', isCorrect: true, validation: tagsPattern },
};
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function EditCourseForm() {
	const { setCourses, modals, setModals } = useCoursesContext();
	const { courseId, course: placeholders } = modals.edit.payload;
	const { form, handleChanges, setFormValues } = useForm(INITIAL_VALUES);

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	function edit(event) {
		event.preventDefault();
		const separatedTags = form.tags.value.split(',');
		const formatedTags = separatedTags.length > 1 ? separatedTags : [];

		const formatedData = {
			name: form.name.value,
			level: form.level.value,
			tags: formatedTags,
		};

		courseService.edit(courseId, formatedData).then((editedCourse) => {
			setModals((otherModals) => ({ ...otherModals, edit: { ...otherModals.edit, show: false } }));
			setCourses((otherCourses) =>
				otherCourses.map((courseItem) => {
					if (courseItem.id !== courseId) return courseItem;

					return editedCourse;
				})
			);
		});
	}

	return (
		<form className="create-course-form" onSubmit={edit}>
			<ValidationInput type="text" name="name" value={form.name.value} onChange={handleChanges} placeholder={placeholders.name} autoComplete="off" isCorrect={form.name.isCorrect} />
			<ValidationInput type="text" name="tags" value={form.tags.value} onChange={handleChanges} placeholder={placeholders.tags?.join('') || 'Tags (optional)'} autoComplete="off" isCorrect={form.tags.isCorrect} />
			<Levels form={form} setFormValues={setFormValues} />
			<CreationModalActions isInfoCorrect={isInfoCorrect} />
		</form>
	);
}
