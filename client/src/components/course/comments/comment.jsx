import { IMAGES_ROUTES } from 'src/services/config';

export default function EpisodeComment({ comment }) {
    console.log(0, comment);
    return (
        <li className="comment">
            <article>
                <header>
                    <img src={`${IMAGES_ROUTES}${comment.creator.profileImage}`} />
                    <h3 className="creator">
                        {comment.creator.name} {comment.creator.lastName}
                    </h3>{' '}
                    - <span className="time-ago">{comment.date}</span>
                </header>
                <p className="content">{comment.content}</p>
            </article>
        </li>
    );
}
