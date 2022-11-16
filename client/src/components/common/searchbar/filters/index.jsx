import Filter from './Filter';

export default function Filters({ filters }) {
	const filterElements = filters.map((filter) => <Filter key={filter.label} filter={filter} />);

	return (
		<div className="filters">
			<ul>{filterElements}</ul>
		</div>
	);
}
