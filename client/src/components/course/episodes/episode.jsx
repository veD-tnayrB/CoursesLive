import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MINIATURE_ROUTE } from 'src/services/config';
import { useCourseContext } from 'src/contexts/course/course.context';
import { useEpisodesContext } from './context';

export default function Episode({ episode }) {
	const { course, selectedEpisode, setSelectedEpisode } = useCourseContext();
	const { episodes } = useEpisodesContext();
	const { courseId } = useParams();
	const isSelected = episode.id === selectedEpisode.id ? 'selected' : '';
	const miniatureSrc = episode?.miniature ? `${MINIATURE_ROUTE}${episode?.miniature}` : `${MINIATURE_ROUTE}default-miniature.jpg`;

	function updateSelectedEpisode() {
		setSelectedEpisode(episodes.find((otherEpisode) => otherEpisode.id === episode.id));
	}

	const formater = Intl.NumberFormat('en', { notation: 'compact' });
	const formatedViews = formater.format(episode.views.length);

	return (
		<li className={`episode-item ${isSelected}`} title={episode.title}>
			<Link to={`/courses/course/${courseId}/episode/${episode.id}`} onClick={updateSelectedEpisode}>
				<div className="episode">
					<div className="miniature-cont">
						<img src={miniatureSrc} alt="" className="episode-preview" />
					</div>

					<div className="info-container">
						<span className="title">{episode.title}</span>
						<p className="creator">
							{course.creator.name} {course.creator.lastName}
						</p>
						<p className="views">{formatedViews} Views</p>
					</div>
				</div>
			</Link>
		</li>
	);
}
