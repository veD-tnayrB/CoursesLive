import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import { uploadEpisode, uploadVideo } from 'src/services/episodes';
import ValidationInput from 'src/components/common/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import VideoDropzone from './video-dropzone';

const titlePattern = /./;
const descriptionPattern = /.{0,250}/;

const INITIAL_VALUES = {
    name: {value: '', isCorrect: false, validation: titlePattern},
    description: {value: '', isCorrect: true, validation: descriptionPattern}
}

const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function CreateEpisodeForm() {
    const { course, setModals } = useCourseContext();
    const [videoFile, setVideoFile] = React.useState({});
    const {form, handleChanges} = useForm(INITIAL_VALUES);

    const correctInputs = Object.keys(form).filter(prop => form[prop].isCorrect);
    const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

    function create(event) {
        event.preventDefault();

        const formatedCourse = {
            title: form.name.value,
            description: form.description.value,
            video: videoFile.name
        };

        const episode = async () => await uploadEpisode(course.id, formatedCourse);
        const video = async () => await uploadVideo(videoFile);

        Promise.all([episode, video])
        .then(values => console.log(values))
        
    }

    return (
        <form className="create-course-form" onSubmit={create}>
            <ValidationInput 
                type="text"
                name="name"
                value={form.name.value}
                onChange={handleChanges}
                placeholder="Name"
                autoComplete="off"
                isCorrect={form.name.isCorrect} 
            />

            <div className="input-container">
                <textarea 
                    type="text"
                    name="description"
                    value={form.description.value}
                    onChange={handleChanges}
                    placeholder="Description (Optional)"
                    autoComplete="off" 
                />
            </div>

            <VideoDropzone setVideo={setVideoFile} />

            <CreationModalActions isInfoCorrect={isInfoCorrect} />
        </form>
    )
}