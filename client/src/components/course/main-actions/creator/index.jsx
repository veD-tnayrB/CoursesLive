import * as React from 'react';
import { getUserById } from 'src/services/user';
import { useCourseContext } from 'src/contexts/course/course.context';
import LoadingIcon from 'src/components/common/load';
import CreatorContent from './content';
import './creator.scss';

export default function EpisodeCreator() {
    const [creator, setCreator] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const { course } = useCourseContext();

    React.useEffect(() => {
        if (!course.creator) return;

        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);

        getUserById(signal, course.creator)
            .then(response => {
                setCreator(response);
                setIsLoading(false);
            })

        return () => controller.abort();
    }, [course.creator]);

    const output = isLoading ? <LoadingIcon /> : <CreatorContent creator={creator} />;

    return (
        <article className="creator-info">
            {output}
        </article>
    )
}