import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import Modal from 'components/modal';
import { useCourses } from 'hooks';

// Icon
import CloseIcon from '@mui/icons-material/Close';

import './assets/sass/watchEpisode.scss';


const WatchEpisode = () => {
    const { coursesList } = useCourses();
    const { courseId, episodeId } = useParams();
    const navigateTo = useNavigate();


    const getVideoId = (link) => {
        const videoId = link.split("/")[3];
        return videoId;
    }
    
    const episodeInfo = useMemo(() => {
        const selectedCourse = coursesList.filter(course => course.id === courseId)[0];
        const episode = selectedCourse.episodes.filter(episode => episode.id === episodeId)[0];
        
        return {...episode, link: getVideoId(episode.link)};
    }, [coursesList, courseId, episodeId])


    return (
        <main className="modal-container page">
            <Modal>
                <article className="episode-container">
                    <button 
                     className="close-button"
                     onClick={() => navigateTo(-1)} 
                    >
                        <CloseIcon />
                    </button>

                    <YouTube
                     className="episode" 
                     iframeClassName="episode-iframe"
                     videoId={episodeInfo.link}
                    />
                    <h1>{episodeInfo.title}</h1>

                    <div className="overview-container">
                        <p>
                            {episodeInfo.overview}
                        </p>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default WatchEpisode;