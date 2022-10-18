import { levelsList } from './levels-list';
import CheckBox from 'src/components/common/form/checkbox';

export default function Levels({ form, setFormValues }) {
    function handleChange(event) {
        const { value } = event.target;
        setFormValues(otherValues => ({ ...otherValues, level: { ...otherValues.level, value: value } }));
    };

    const levelElements = levelsList.map(level => (
        <CheckBox 
            key={level.value} 
            checkbox={level} 
            selectedOption={form.level.value} 
            handleChange={handleChange} 
        />
    ));

    return (
        <div className="levels-container">
            {levelElements}
        </div>
    )
}