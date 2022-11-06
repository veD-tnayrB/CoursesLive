import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import LoadingIcon from 'src/components/common/load';
import CreatorContent from './content';
import './creator.scss';

export default function EpisodeCreator() {
    const { course, isLoading } = useCourseContext();

    const output = isLoading ? <LoadingIcon /> : <CreatorContent creator={course.creator} />;
    return <article className="creator-info">{output}</article>;
}
