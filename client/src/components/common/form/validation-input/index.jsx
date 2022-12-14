import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import './validation-input.scss';

export default function ValidationInput(props) {
    const { isCorrect, ...otherProps } = props;
    const Icon = props.isCorrect ? CheckIcon : ClearIcon;
    const cls = props.value.length > 0 ? props.isCorrect ? 'correct' : 'incorrect' : 'default';

    return (
        <div className={`validation-input input-container ${cls}`}>
            <input {...otherProps} />
                <Icon className={`icon ${cls}`} />
        </div>
    )
}