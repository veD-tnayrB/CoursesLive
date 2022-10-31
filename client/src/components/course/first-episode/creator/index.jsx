import * as React from 'react';
import { getUserById } from 'src/services/user';
import { useCourseContext } from 'src/contexts/course/course.context';
import { IMAGES_ROUTES } from 'src/services/config';
import './creator.scss';

export default function EpisodeCreator() {
    const [creator, setCreator] = React.useState({});
    const { course } = useCourseContext();

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getUserById(signal, course.creator)
            .then(response => {
                setCreator(response);
                console.log(response)
            })

        return () => controller.abort();
    }, [course.creator]);

    return (
        <article className="creator-info">
            <img src={`${IMAGES_ROUTES}${creator.profileImage}`} />
            <h3>{creator.name} {creator.lastName}</h3>
        </article>
    )
}