import { useFirstEpisodeContext } from '../context';
import Like from './like';

export default function EpisodeInfo() {
    const { selectedEpisode } = useFirstEpisodeContext();

    return (
        <div className="content-info">
            <h2>{selectedEpisode?.title}</h2>
            <Like />
        </div>
    )
}