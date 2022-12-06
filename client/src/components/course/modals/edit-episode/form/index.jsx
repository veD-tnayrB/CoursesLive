import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import { episodeService } from 'src/services/episodes';
import ValidationInput from 'src/components/common/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import VideoDropzone from './video-dropzone';
import MiniatureDropzone from './miniature-dropzone';
import './form.scss';

const titlePattern = /./;
const descriptionPattern = /.{0,250}/;

const INITIAL_VALUES = {
	title: { value: '', isCorrect: false, validation: titlePattern },
	description: { value: '', isCorrect: true, validation: descriptionPattern },
};

const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function CreateEpisodeForm() {
	const { courseId } = useParams();
	const { setCourse, course, setModals, setSelectedEpisode } = useCourseContext();
	const [files, setFiles] = React.useState({ video: {}, image: {} });
	const { form, handleChanges } = useForm(INITIAL_VALUES);
	const navigateTo = useNavigate();

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	function create(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('video', files.video);
		formData.append('title', form.title.value);
		formData.append('description', form.description.value);
		formData.append('videoName', videoFile.name);

		episodeService.uploadEpisode(course.id, formData).then((newEpisode) => {
			setCourse((otherProperties) => ({
				...otherProperties,
				episodes: [...otherProperties.episodes, newEpisode],
			}));

			setModals((otherModals) => ({
				...otherModals,
				create: { ...otherModals.create, show: false },
			}));

			setSelectedEpisode(newEpisode);
			navigateTo(`/courses/course/${courseId}/episode/${newEpisode.id}`);
		});
	}

	return (
		<form className="edit-course-form" onSubmit={create}>
			<VideoDropzone files={files} setFiles={setFiles} />
			<ValidationInput type="text" name="title" value={form.title.value} onChange={handleChanges} placeholder="Title" autoComplete="off" isCorrect={form.title.isCorrect} />

			<div className="input-container">
				<textarea type="text" name="description" value={form.description.value} onChange={handleChanges} placeholder="Description (Optional)" autoComplete="off" />
			</div>

			<MiniatureDropzone files={files} setFiles={setFiles} />
			<CreationModalActions isInfoCorrect={isInfoCorrect} />
		</form>
	);
}
