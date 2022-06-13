import { useState, useEffect } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';

import EpisodeCard from './components/episodeCard';
import { useCourses, useLoggedUser } from 'hooks';

import './assets/sass/episodes.scss';


const Episodes = () => {
    const [courseEpisodes, setCourseEpisodes] = useState([]);
    const { coursesList } = useCourses();
    const { loggedUser } = useLoggedUser();
    const { courseId } = useParams();
    const navigateTo = useNavigate();
    

    // Get the episodes and update the list every time it changes
    useEffect(() => {
        const selectedCourse = coursesList.find(course => course.id === courseId);
        setCourseEpisodes(selectedCourse.episodes);
    }, [coursesList, courseId])

    
    const episodesElements = courseEpisodes.map(episode => (
        <EpisodeCard
         key={episode.id}
         episodeInfo={episode}
         loggedUser={loggedUser}
        />
    ))

    return (
        <main className="episodes-page page">
            <div className="title-decoration">
                <h2>Episodes</h2>
            </div>

            {
                loggedUser.role === 'admin' &&
                <button
                 className="button create-button"
                 onClick={() => navigateTo('new')}
                >
                    Create Episode
                </button>
            }

            {
                episodesElements.length === 0
                    ?
                <div className="nothing-message">
                    Looks like theres nothing here yet!
                </div>
                    :
                <section>
                    <ol className="items-list">
                        {episodesElements}
                    </ol>
                </section>
            }
            
            <Outlet />

        </main>
    )
}

export default Episodes;