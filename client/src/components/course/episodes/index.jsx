import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import Episode from './episode';
import Filters from './filters';
import './episodes.scss';

export default function Episodes() {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const { course } = useCourseContext();

    const episodesElements = course.episodes.map((episode) => <Episode key={episode.id} episode={episode} />);

    return (
        <section className="episodes-section">
            <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <ul>{episodesElements}</ul>
        </section>
    );
}
