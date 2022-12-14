import * as React from 'react';
import { useCoursesContext } from 'src/contexts/courses/courses.context';
import { courseService } from 'src/services/courses';
import ValidationInput from 'src/components/common/form/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import Levels from 'src/components/courses/levels/';
import CoverDropzone from './cover-dropzone';
import './form.scss';

const namePattern = /./;
const levelPattern = /^(Beginner|Mid Level|Senior)$/;
const tagsPattern = /[a-zA-Z]\,/;

const INITIAL_VALUES = {
	name: { value: '', isCorrect: false, validation: namePattern },
	level: { value: 'Beginner', isCorrect: true, validation: levelPattern },
	tags: { value: '', isCorrect: true, validation: tagsPattern },
};
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function CreateCourseForm() {
	const { setCourses, setModals } = useCoursesContext();
	const [cover, setCover] = React.useState({ name: '' });
	const { form, handleChanges, setFormValues } = useForm(INITIAL_VALUES);

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	function create(event) {
		event.preventDefault();
		const separatedTags = form.tags.value.split(',');
		const formatedTags = separatedTags.length > 1 ? separatedTags : [];

		const formData = new FormData();
		formData.append('name', form.name.value);
		formData.append('level', form.level.value);
		formData.append('tags', formatedTags);
		formData.append('cover', cover.image);

		courseService.create(formData).then((newCourse) => {
			setModals((otherModals) => ({ ...otherModals, create: { ...otherModals.create, show: false } }));
			setCourses((otherCourses) => [newCourse, ...otherCourses]);
		});
	}

	return (
		<form className="create-course-form" onSubmit={create}>
			<CoverDropzone file={cover} setFile={setCover} />
			<ValidationInput type="text" name="name" value={form.name.value} onChange={handleChanges} placeholder="Name" autoComplete="off" isCorrect={form.name.isCorrect} />

			<ValidationInput type="text" name="tags" value={form.tags.value} onChange={handleChanges} placeholder="Tags (Optional)" autoComplete="off" isCorrect={form.tags.isCorrect} />
			<Levels form={form} setFormValues={setFormValues} />
			<CreationModalActions isInfoCorrect={isInfoCorrect} />
		</form>
	);
}
