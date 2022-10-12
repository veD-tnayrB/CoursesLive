export default function Level({ level, selectedLevel, setFormValues }) {
    const { label, value } = level;
    const isSelected = selectedLevel === value;

    function handleChange(event) {
        const { value } = event.target;
        setFormValues(otherValues => ({ ...otherValues, level: { ...otherValues.level, value: value } }));
    }

    const icon = isSelected ? 'src/assets/icons/checked.svg' : 'src/assets/icons/unchecked.svg';

    return (
        <div className="level">
            <label>
            <img 
                src={icon} 
                alt="" 
                className="icon" 
            />
        
            <input
                type="radio"
                value={value}
                checked={isSelected}
                onChange={handleChange}
                required
            />
            
                <span>{label}</span>
            </label>
        </div>
    )
}