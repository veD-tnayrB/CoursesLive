import { useCourseContext } from 'src/contexts/course/course.context';
import LoadingIcon from 'src/components/common/load';
import CreateEpisode from './content';

export default function CreateEpisodeWarning() {
    const { isLoading } = useCourseContext();
    const output = isLoading ? <LoadingIcon /> : <CreateEpisode />;

    return (
        <div className="video-error">
            {output}
        </div>
    )
}