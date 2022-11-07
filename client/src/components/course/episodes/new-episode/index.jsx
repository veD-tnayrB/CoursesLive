import Card from 'src/components/common/card';
import AddIcon from '@mui/icons-material/Add';
import { useCourseContext } from 'src/contexts/course/course.context';
import './new-episode.scss';

export default function NewEpisode() {
    const { setModals } = useCourseContext();

    function showCreateEpisodeModal() {
        setModals((otherModals) => ({ ...otherModals, create: { ...otherModals.createEpisode, show: true } }));
    }

    return (
        <Card className="new-episode">
            <button onClick={showCreateEpisodeModal} className="create-episode-button">
                <AddIcon className="icon" />
            </button>
        </Card>
    );
}
