import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import LoadingIcon from 'src/components/common/load';
import { IMAGES_ROUTES } from 'src/services/config';
import './creator.scss';

export default function EpisodeCreator() {
    const { course } = useCourseContext();
    const creator = course.creator;

    return (
        <div className="creator-info">
            <img src={`${IMAGES_ROUTES}${creator.profileImage}`} />
            <h3>
                {creator.name} {creator.lastName}
            </h3>
        </div>
    );
}
