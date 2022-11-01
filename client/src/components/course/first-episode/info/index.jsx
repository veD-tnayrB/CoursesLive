import { useFirstEpisodeContext } from '../context';
import Like from './like';

export default function EpisodeInfo() {
    const { firstEpisode } = useFirstEpisodeContext();

    return (
        <div className="content-info">
            <h2>{firstEpisode?.title}</h2>
            <Like />
        </div>
    )
}