import { useCourseContext } from 'src/contexts/course/course.context';
import Header from 'src/components/common/header';

export default function CreateEpisodeWarning() {
    const { setModals } = useCourseContext();

    function openCreateEpisodeModal() {
        setModals(otherModals => ({...otherModals, createEpisode: {...otherModals.createEpisode, show: true }}))
    }

    return (
        <Header className="subtitle">
            <h2>
                What happened here?!
            </h2>

            <p>
                You haven't uploaded your first episode yet?  Don't worry, just upload it and we'll take care of the rest.
            </p>

            <button 
                onClick={openCreateEpisodeModal}
                className="primary-button"
            >
                Upload episode!
            </button>
        </Header>
    )
}