export default
function Comment({ comment }) {
    return (
        <li className="comment-item">
            <article>
                <img 
                    src={comment.profileImage} 
                    alt={comment.name} 
                    className="user-profile" 
                />

                <div className="content">
                    <h4 className="user-name">
                        {comment.name}
                    </h4>

                    <p className="content">
                        {comment.content}
                    </p>
                </div>
            </article>
        </li>
    )
}