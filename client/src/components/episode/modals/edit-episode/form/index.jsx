import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import { episodeService } from 'src/services/episodes';
import ValidationInput from 'src/components/common/form/validation-input';
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
	const { setCourse, course, setModals, setSelectedEpisode, selectedEpisode } = useEpisodeContext();
	const [files, setFiles] = React.useState({ video: {}, image: {} });
	const { form, handleChanges } = useForm(INITIAL_VALUES);
	const navigateTo = useNavigate();

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	function edit(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('video', files.video);
		formData.append('miniature', files.image);
		formData.append('title', form.title.value);
		formData.append('description', form.description.value);
		formData.append('videoName', files.video.name);

		episodeService.edit(course.id, course.folder, selectedEpisode.id, formData).then((editedEpisode) => {
			setCourse((otherProperties) => ({
				...otherProperties,
				episodes: [...otherProperties.episodes, editedEpisode],
			}));

			setModals((otherModals) => ({
				...otherModals,
				edit: { ...otherModals.edit, show: false },
			}));

			setSelectedEpisode(editedEpisode);
			navigateTo(0);
		});
	}

	return (
		<form className="edit-course-form" onSubmit={edit}>
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
