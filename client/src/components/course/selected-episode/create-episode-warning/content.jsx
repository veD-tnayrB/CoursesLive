import { useCourseContext } from 'src/contexts/course/course.context';

export default function CreateEpisode() {
    const { setModals } = useCourseContext();

    function openCreateEpisodeModal() {
        setModals((otherModals) => ({ ...otherModals, create: { ...otherModals.create, show: true } }));
    }

    return (
        <article className="message">
            <div className="content-container">
                <h2>Oops, looks like theres no episodes here</h2>

                <p>
                    It looks like you haven't uploaded any episode yet, don't worry, you upload it and we'll take care
                    of the rest.
                </p>

                <button onClick={openCreateEpisodeModal} className="primary-button">
                    Upload episode!
                </button>
            </div>
        </article>
    );
}
