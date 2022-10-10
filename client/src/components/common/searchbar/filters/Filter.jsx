import { useSearchContext } from "../searchbar.context";

export default function Filter({ filter }) {
    const { selectedFilter, setSelectedFilter } = useSearchContext();
    const isFilterSelected = selectedFilter === filter.value;
    const filterSelectedClass = isFilterSelected ? 'selected' : '';

    function selectFilter() {
        if (isFilterSelected) return setSelectedFilter('');
        setSelectedFilter(filter.value);
    }

    return (
        <button 
            className={`filter ${filterSelectedClass}`}
            onClick={selectFilter}
        >
            {filter.label}
        </button>
    )
}