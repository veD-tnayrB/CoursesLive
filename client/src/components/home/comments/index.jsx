import Comment from "./Comment"
import { commentList } from "./comment-list"
import './comment-section.scss';

export default
function Comments() {

    const commentsElements = commentList.map(comment => (
        <Comment
            key={comment.id} 
            comment={comment} 
        />
    ))

    return (
        <section className="comment-section">
            <h2>Comments of our students!</h2>

            <ul className="comments-list">
                {commentsElements}
            </ul>
        </section>
    )
}