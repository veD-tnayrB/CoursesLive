import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import { useEpisodeContext } from './context';

export default function Episode({ episode }) {
	const { course, selectedEpisode, setSelectedEpisode } = useCourseContext();
	const { episodes } = useEpisodeContext();
	const { courseId } = useParams();
	const isSelected = episode.id === selectedEpisode.id ? 'selected' : '';

	function updateSelectedEpisode() {
		setSelectedEpisode(episodes.find((otherEpisode) => otherEpisode.id === episode.id));
	}

	return (
		<li className={`episode-item ${isSelected}`} title={episode.title}>
			<Link to={`/courses/course/${courseId}/episode/${episode.id}`} onClick={updateSelectedEpisode}>
				<div className="episode">
					<img src="" alt="" className="episode-preview" />

					<div className="info-container">
						<span className="title">{episode.title}</span>
						<p className="creator">
							{course.creator.name} {course.creator.lastName}
						</p>
						<p className="views">{episode.views}</p>
					</div>
				</div>
			</Link>
		</li>
	);
}
