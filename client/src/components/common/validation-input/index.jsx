import './validation-input.scss';

export default function ValidationInput(props) {
    const { isCorrect, ...otherProps } = props;
    const iconPath = props.isCorrect ? 'src/assets/icons/approval.svg' : 'src/assets/icons/unavaiable.svg';
    const cls = props.value.length > 0 ? props.isCorrect ? 'correct' : 'incorrect' : 'default';

    return (
        <div className={`validation-input input-container ${cls}`}>
            <input {...otherProps} />

                <img
                    src={iconPath}
                    alt=""
                    className={cls}
                />
        </div>
    )
}