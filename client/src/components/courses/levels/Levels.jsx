import { levelsList } from './levels-list';
import Level from './';

export default function Levels({ form, setFormValues }) {
    const levelElements = levelsList.map(level => (
        <Level key={level.value} level={level} selectedLevel={form.level.value} setFormValues={setFormValues} />
    ));

    return (
        <div className="levels-container">
            {levelElements}
        </div>
    )
}