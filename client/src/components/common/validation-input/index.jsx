import './validation-input.scss';

export default function ValidationInput(props) {
    const { value, validation } = props;
    const isValueCorrect = validation.test(value);
    const iconPath = isValueCorrect ? 'src/assets/icons/approval.svg' : 'src/assets/icons/unavaiable.svg';
    const cls = isValueCorrect ? 'correct' : 'incorrect';

    return (
        <div className={`validation-input ${cls}`}>
            <input {...props} />
            <img 
                src={iconPath}
                alt=""
                className={cls}
            />
        </div>
    )
}